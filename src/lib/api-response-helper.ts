import { ServerResponseType } from '@/@types/api-response';
import { NextResponse } from 'next/server';

/**
 * A universal API response helper function for Next.js 15.
 * @param {ServerResponseType<T>} options - API response parameters.
 * @returns {NextResponse<ServerResponseType<T>>}
 */
export default function serverResponse<T>({
  success,
  message = undefined,
  error = undefined,
  data = undefined,
  status = 200,
}: ServerResponseType<T>): NextResponse<ServerResponseType<T>> {
  const response: ServerResponseType<T> = { success, status };

  if (message) response.message = message;
  if (error) response.error = error;
  if (data) response.data = data;

  return NextResponse.json(response, { status: response.status });
}
