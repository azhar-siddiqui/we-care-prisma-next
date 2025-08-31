import { ServerResponseType } from '@/@types/api-response';

export async function logout(): Promise<ServerResponseType<{ token: string }>> {
  const response = await fetch('/api/auth/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}
