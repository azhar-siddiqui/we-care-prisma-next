import { ServerResponseType } from '@/@types/api-response';
import { Doctor } from '@/generated/prisma';
import { doctorFormSchema } from '@/validation/doctor/doctor';
import z from 'zod';

export async function addDoctorApiAction(
  data: z.infer<typeof doctorFormSchema>,
): Promise<ServerResponseType<unknown>> {
  const response = await fetch('/api/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getAllDoctorApiAction(): Promise<ServerResponseType<Doctor[]>> {
  const response = await fetch('/api/doctors', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return response.json();
}
