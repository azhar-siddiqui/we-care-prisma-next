import { ServerResponseType } from '@/@types/api-response';
import { verifyOtpSchema } from '@/validation/auth/admin/verify-email';
import z from 'zod';

export async function verifyEmailApiAction(
  data: z.infer<typeof verifyOtpSchema>,
): Promise<ServerResponseType<unknown>> {
  const response = await fetch('/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
