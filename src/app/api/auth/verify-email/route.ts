import serverResponse from '@/lib/api-response-helper';
import prisma from '@/lib/prisma';
import { deleteOTP, redis, verifyOTP } from '@/lib/redis';
import { formatZodError } from '@/lib/zod-error-msg';
import { verifyOtpSchema } from '@/validation/auth/admin/verify-email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { email, otp } = parsed.data;

    // Verify OTP
    const { isValid, message } = await verifyOTP(email, otp);

    if (!isValid) {
      return serverResponse({
        success: false,
        error: message,
        status: 400,
      });
    }

    // Check if email or contact number already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin?.isVerified) {
      return serverResponse({
        success: false,
        error: 'Email already verified',
        status: 400,
      });
    }

    // Retrieve pending admin data from Redis
    const pendingKey = `pending:admin:${email}`;
    const pendingData = await redis.get(pendingKey);

    if (!pendingData) {
      return serverResponse({
        success: false,
        error: 'No pending admin data found',
        status: 400,
      });
    }

    let adminData;
    if (typeof pendingData === 'string') {
      try {
        adminData = JSON.parse(pendingData);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Data:', pendingData);
        return serverResponse({
          success: false,
          error: 'Invalid pending data format',
          status: 400,
        });
      }
    } else if (typeof pendingData === 'object') {
      adminData = pendingData;
    } else {
      return serverResponse({
        success: false,
        error: 'Invalid pending data type',
        status: 400,
      });
    }

    // Validate adminData structure
    if (!adminData.labName || !adminData.email || !adminData.password) {
      return serverResponse({
        success: false,
        error: 'Incomplete admin data',
        status: 400,
      });
    }

    // Create admin in PostgreSQL using Prisma
    await prisma.admin.create({
      data: {
        ...adminData,
        isVerified: true,
      },
    });

    // Delete OTP and pending data from Redis
    await deleteOTP(email);
    await redis.del(pendingKey);

    return serverResponse({
      success: true,
      message: 'Email verified successfully',
      status: 200,
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
