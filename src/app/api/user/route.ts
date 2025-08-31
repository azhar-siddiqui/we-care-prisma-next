import { Role } from '@/generated/prisma';
import serverResponse from '@/lib/api-response-helper';
import { hashPassword, verifyToken } from '@/lib/auth';
import { generateUniqueUsername } from '@/lib/generate-username';
import prisma from '@/lib/prisma';

import { formatZodError } from '@/lib/zod-error-msg';
import { userSchema } from '@/validation/auth/user/user';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify JWT from cookie
    const token = request.cookies.get('ADMIN_token')?.value;
    if (!token) {
      return serverResponse({
        success: false,
        message: 'Unauthorized',
        status: 401,
      });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== Role.ADMIN) {
      return serverResponse({
        success: false,
        message: 'Forbidden: Admin access required',
        status: 403,
      });
    }

    // Parse request body
    const body = await request.json();
    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { name, contactNumber, password } = parsed.data;

    // Check for existing user with the same contact number
    const existingUser = await prisma.user.findUnique({
      where: {
        contactNumber,
      },
    });

    if (existingUser) {
      return serverResponse({
        success: false,
        message: 'User with this contact number already exists',
        status: 409,
      });
    }

    // Fetch admin's labName
    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        labName: true,
      },
    });

    if (!admin) {
      return serverResponse({
        success: false,
        message: 'Admin not found',
        status: 404,
      });
    }

    const userName = await generateUniqueUsername(name, 'wecare');

    // Create user
    await prisma.user.create({
      data: {
        name,
        username: userName,
        contactNumber,
        password: await hashPassword(password),
        role: Role.USER,
        adminId: decoded.id,
      },
    });

    return serverResponse({
      success: true,
      message: 'User created successfully',
      status: 201,
    });
  } catch (error) {
    console.error('User creation error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get('ADMIN_token')?.value ?? request.cookies.get('USER_token')?.value;

    if (!token) {
      return serverResponse({
        success: false,
        message: 'Unauthorized: No token provided',
        status: 401,
      });
    }

    // Verify token and check role
    const decoded = await verifyToken(token);

    if (!decoded || decoded.role !== Role.ADMIN) {
      return serverResponse({
        success: false,
        message: 'Unauthorized: Admin access required',
        status: 401,
      });
    }

    const users = await prisma.user.findMany({
      where: {
        adminId: decoded.id,
      },
    });

    if (!users || users.length === 0) {
      return serverResponse({
        success: false,
        message: 'No users found for this admin',
        status: 404,
      });
    }

    return serverResponse({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      status: 200,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
