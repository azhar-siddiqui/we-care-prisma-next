import { Role } from "@/generated/prisma";
import serverResponse from "@/lib/api-response-helper";
import { comparePassword, generateToken } from "@/lib/auth";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { formatZodError } from "@/lib/zod-error-msg";
import { loginSchema } from "@/validation/auth/admin/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { email, password } = parsed.data;

    // Check if admin
    const loggedInUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (!loggedInUser) {
      return serverResponse({
        success: false,
        message: "This email does not exist. Please register first.",
        status: 404,
      });
    }

    // Validate password
    const isPasswordValid = await comparePassword(
      password,
      loggedInUser.password
    );

    if (!isPasswordValid) {
      return serverResponse({
        success: false,
        message: "Invalid credentials",
        status: 401,
      });
    }

    const token = await generateToken(loggedInUser);

    // Prepare response data
    const responseData = {
      success: true,
      status: 200,
      message:
        loggedInUser.role === Role.ADMIN
          ? "Admin logged in successfully"
          : "User logged in successfully",
      data: {
        id: loggedInUser.id,
        email: loggedInUser.email,
        role: loggedInUser.role,
        isTrialUsed: loggedInUser.isTrialUsed,
        isBlock: loggedInUser.isBlock,
      },
    };

    // Create response
    const response = NextResponse.json(responseData, { status: 200 });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: `${loggedInUser.role}_token`,
      value: token,
      httpOnly: true,
      secure: env.APP_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Sign-in error:", error);
    return serverResponse({
      success: false,
      error: "Internal server error",
      status: 500,
    });
  }
}
