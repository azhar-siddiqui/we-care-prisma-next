import { ServerResponseType } from '@/@types/api-response';
import { signUpAdminSchema } from '@/validation/auth/admin/signup';
import z from 'zod';

export async function signUpApiAction(
  data: z.infer<typeof signUpAdminSchema>,
): Promise<ServerResponseType<null>> {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
