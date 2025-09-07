import { ServerResponseType } from '@/@types/api-response';
import { patientRegistrationFormSchema } from '@/validation/patient-registration/patient-registration-form-validation';
import z from 'zod';

export async function addPatientApiAction(
  data: z.infer<typeof patientRegistrationFormSchema>,
): Promise<ServerResponseType<unknown>> {
  const response = await fetch('/api/patient', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
