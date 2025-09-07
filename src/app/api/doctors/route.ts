import { Role } from '@/generated/prisma';
import serverResponse from '@/lib/api-response-helper';
import { isValidRole, verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { formatZodError } from '@/lib/zod-error-msg';
import { doctorFormSchema } from '@/validation/doctor/doctor';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('ADMIN_token')?.value ?? cookieStore.get('USER_token')?.value;

    // Check if no token is present
    if (!token) {
      return serverResponse({
        success: false,
        error: 'Unauthorized: No token provided',
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

    // Parse and validate body
    const body = await request.json();
    const parsed = doctorFormSchema.safeParse(body);

    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const { doctorName, email, commission, phone, degree, referredById } = parsed.data;

    // Check if contact number already exists
    const existingDoctorContact = await prisma.doctor.findUnique({
      where: {
        phone,
      },
    });

    if (existingDoctorContact) {
      return serverResponse({
        success: false,
        error: 'Contact number already registered',
        status: 409,
      });
    }

    // Validate referredById if provided
    const defaultSelfDoctorId = '39ee36d6-229e-46e1-8c3c-ce4b14b798b2';
    const finalReferredById = referredById || defaultSelfDoctorId;

    if (finalReferredById) {
      const referredByDoctor = await prisma.doctor.findUnique({
        where: {
          id: finalReferredById,
        },
      });

      if (!referredByDoctor) {
        return serverResponse({
          success: false,
          error: 'Referred doctor not found',
          status: 404,
        });
      }
    }

    // Fetch admin's labName
    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!admin) {
      return serverResponse({
        success: false,
        message: 'Admin not found',
        status: 404,
      });
    }

    // Create new doctor with admin reference
    await prisma.doctor.create({
      data: {
        doctorName,
        email,
        commission,
        phone,
        degree,
        role: Role.DOCTOR,
        adminId: decoded.id,
        referredById: finalReferredById,
      },
    });

    return serverResponse({
      success: true,
      message: 'Doctor Detail Saved',
      status: 201,
    });
  } catch (error) {
    console.error('Add Doctort error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('ADMIN_token')?.value ?? cookieStore.get('USER_token')?.value;

    // Check if no token is present
    if (!token) {
      return serverResponse({
        success: false,
        error: 'Unauthorized: No token provided',
        status: 401,
      });
    }

    // Verify token and check role
    const decoded = await verifyToken(token);

    if (!decoded || !isValidRole(decoded.role)) {
      return serverResponse({
        success: false,
        message: 'Unauthorized: Invalid role',
        status: 401,
      });
    }

    const doctors = await prisma.doctor.findMany({
      where: {
        OR: [
          { adminId: decoded.id }, // Admin's own doctors
          { adminId: null, doctorName: 'Self' }, // "Self" doctor
        ],
      },
    });

    if (!doctors || doctors.length === 0) {
      return serverResponse({
        success: true,
        message: 'No doctors found',
        status: 404,
      });
    }

    return serverResponse({
      success: true,
      message: 'Doctors retrieved successfully',
      data: doctors,
      status: 200,
    });
  } catch (error) {
    console.error('Get All Doc error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
