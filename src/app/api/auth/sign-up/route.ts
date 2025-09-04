import serverResponse from '@/lib/api-response-helper';
import { hashPassword } from '@/lib/auth';
import { env } from '@/lib/env';
import prisma from '@/lib/prisma';
import { redis, storeOTP } from '@/lib/redis';
import { sendVerificationEmail } from '@/lib/send-verification-email';
import { generateOtp } from '@/lib/utils';
import { formatZodError } from '@/lib/zod-error-msg';
import { signUpAdminSchema } from '@/validation/auth/admin/signup';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signUpAdminSchema.safeParse(body);

    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { labName, ownerName, email, password, contactNumber, previousSoftware } = parsed.data;

    // Rate limiting: Check signup attempts
    const rateLimitKey = `signup:attempt:${email}`;
    const attempts = await redis.get(rateLimitKey);
    const maxAttempts = 5;
    if (attempts && parseInt(attempts as string) >= maxAttempts) {
      return serverResponse({
        success: false,
        error: 'Too many request. Try again later.',
        status: 429,
      });
    }

    // Increment signup attempts
    await redis.incr(rateLimitKey);
    await redis.expire(rateLimitKey, 3600); // 1 hour expiry

    // Check if email already exists
    const existingAdminEmail = await prisma.admin.findUnique({
      where: { email },
    });

    // Check if contact number already exists
    const existingAdminContact = await prisma.admin.findUnique({
      where: { contactNumber },
    });

    if (existingAdminEmail) {
      return serverResponse({
        success: false,
        error: 'Email already registered',
        status: 409,
      });
    }

    if (existingAdminContact) {
      return serverResponse({
        success: false,
        error: 'Contact number already registered',
        status: 409,
      });
    }

    // Generate OTP
    const otp = generateOtp();
    // Store OTP in Redis
    await storeOTP(email, otp);

    // Send OTP email using Resend + React Email
    const emailResult = await sendVerificationEmail(ownerName, email, otp);
    if (!emailResult.success) {
      return serverResponse({
        success: false,
        message: emailResult.message,
        status: 500,
      });
    }

    // Temporarily store admin data in Redis (until verified)
    await redis.set(
      `pending:admin:${email}`,
      JSON.stringify({
        labName,
        ownerName,
        email,
        password: await hashPassword(password),
        contactNumber,
        previousSoftware,
      }),
      { ex: parseInt(env.REDIS_TEMP_ADMIN_TTL || '600') },
    );

    return serverResponse({
      success: true,
      message: 'OTP sent to email',
      status: 200,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
