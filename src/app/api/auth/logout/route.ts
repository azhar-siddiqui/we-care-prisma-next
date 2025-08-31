import serverResponse from '@/lib/api-response-helper';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get cookies using Next.js cookies API
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('ADMIN_token')?.value;
    const userToken = cookieStore.get('USER_token')?.value;

    // Check if no token is present
    if (!adminToken && !userToken) {
      return serverResponse({
        success: false,
        error: 'Not authenticated. Please log in first.',
        status: 401,
      });
    }

    // Verify token (try admin token first, then user token)
    let isValidToken = false;
    try {
      if (adminToken) {
        await verifyToken(adminToken);
        isValidToken = true;
      } else if (userToken) {
        await verifyToken(userToken);
        isValidToken = true;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return serverResponse({
        success: false,
        error: 'Invalid or expired token.',
        status: 401,
      });
    }

    // If no valid token was found
    if (!isValidToken) {
      return serverResponse({
        success: false,
        error: 'Invalid or expired token.',
        status: 401,
      });
    }

    // Create response
    const response = serverResponse({
      success: true,
      message: 'Logged out successfully',
      status: 200,
    });

    // Clear both ADMIN_token and USER_token cookies
    response.cookies.delete({
      name: 'ADMIN_token',
      path: '/',
    });

    response.cookies.delete({
      name: 'USER_token',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return serverResponse({
      success: false,
      error: 'Internal server error',
      status: 500,
    });
  }
}
