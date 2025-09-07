import { Role } from '@/generated/prisma';
import serverResponse from '@/lib/api-response-helper';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { formatZodError } from '@/lib/zod-error-msg';
import { patientRegistrationFormSchema } from '@/validation/patient-registration/patient-registration-form-validation';
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
    if (!decoded || (decoded.role !== Role.ADMIN && decoded.role !== Role.USER)) {
      return serverResponse({
        success: false,
        message: 'Unauthorized: Admin access required',
        status: 401,
      });
    }

    // Parse and validate body
    const body = await request.json();
    // Convert string date to Date object if it's a string
    if (body.date && typeof body.date === 'string') {
      body.date = new Date(body.date);
    }

    const parsed = patientRegistrationFormSchema.safeParse(body);
    if (!parsed.success) {
      return serverResponse({
        success: false,
        error: formatZodError(parsed.error),
        status: 400,
      });
    }

    const {
      date,
      doctorId,
      designation,
      patientName,
      phone,
      gender,
      age,
      ageType,
      email,
      address,
    } = parsed.data;

    const newPatient = await prisma.patient.create({
      data: {
        doctorId: doctorId,
        designation,
        name: patientName,
        phone: phone,
        gender,
        age,
        ageType,
        email,
        address,
        patientRegistrationDate: date,
        // Set ids depending on role
        ...(decoded.role === Role.ADMIN && {
          adminId: decoded.id,
          userId: null,
        }),
        ...(decoded.role === Role.USER && {
          userId: decoded.id,
          adminId: decoded.adminId,
        }),
      },
      select: {
        id: true,
      },
    });

    return serverResponse({
      success: true,
      message: 'Patinet Saved',
      status: 201,
      data: {
        id: newPatient.id,
      },
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
