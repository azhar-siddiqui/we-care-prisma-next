import { LoggedInAdminUser, LoggedInUser } from '@/@types/login-user';
import { Role } from '@/generated/prisma';

import serverResponse from '@/lib/api-response-helper';
import { comparePassword, generateToken } from '@/lib/auth';
import { env } from '@/lib/env';

import prisma from '@/lib/prisma';
import { formatZodError } from '@/lib/zod-error-msg';
import { signInSchema } from '@/validation/auth/admin/login';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { email, password } = parsed.data;

    let loggedInUser: LoggedInAdminUser | LoggedInUser | null = null;

    // Check if admin
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    const user = await prisma.user.findUnique({ where: { username: email } });

    if (admin) {
      // Validate ADMIN password
      const isPasswordValid = await comparePassword(password, admin.password);

      if (!isPasswordValid) {
        return serverResponse({
          success: false,
          message: 'Invalid credentials',
          status: 401,
        });
      }

      loggedInUser = {
        id: admin.id,
        email: admin.email,
        labName: admin.labName,
        ownerName: admin.ownerName,
        contactNumber: admin.contactNumber,
        role: admin.role,
        isBlock: admin.isBlock,
        isTrialUsed: admin.isTrialUsed,
      };
    } else if (user) {
      // Validate user password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return serverResponse({
          success: false,
          message: 'Invalid credentials',
          status: 401,
        });
      }

      loggedInUser = {
        id: user.id,
        username: user.username,
        name: user.name,
        contactNumber: user.contactNumber,
        role: user.role,
        adminId: user.adminId,
      };
    } else {
      return serverResponse({
        success: false,
        error: 'This email or username does not exist. Please register first.',
        status: 404,
      });
    }

    if ('isBlock' in loggedInUser && loggedInUser.isBlock) {
      return serverResponse({
        success: false,
        error: 'Account is blocked',
        status: 403,
      });
    }

    const token = await generateToken(loggedInUser);

    // Prepare response data
    const responseData = {
      success: true,
      status: 200,
      message:
        loggedInUser.role === Role.ADMIN
          ? 'Admin logged in successfully'
          : 'User logged in successfully',
    };

    const response = NextResponse.json(responseData, { status: 200 });

    response.cookies.set({
      name: `${loggedInUser.role}_token`,
      value: token,
      httpOnly: true,
      secure: env.APP_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Sign-in error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
