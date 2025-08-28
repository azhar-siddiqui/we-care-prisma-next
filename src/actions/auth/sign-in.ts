import { ServerResponseType } from '@/@types/api-response';
import { signInSchema } from '@/validation/auth/admin/login';
import z from 'zod';

export async function signInApiAction(
  data: z.infer<typeof signInSchema>,
): Promise<ServerResponseType<{ token: string }>> {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
