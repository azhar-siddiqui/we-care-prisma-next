import { verifyToken } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get('ADMIN_token')?.value;
  const userToken = request.cookies.get('USER_token')?.value;

  // Define public and protected routes
  const protectedRoutes = ['/patient-registration', '/task', '/settings', '/dashboard'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if user or admin is authenticated
  let isAuthenticated = false;
  try {
    const [adminValid, userValid] = await Promise.all([
      adminToken ? verifyToken(adminToken) : Promise.resolve(null),
      userToken ? verifyToken(userToken) : Promise.resolve(null),
    ]);
    isAuthenticated = !!adminValid || !!userValid;
  } catch (error) {
    console.error('Token verification error:', error);
    isAuthenticated = false;
  }

  // Redirect authenticated users away from /sign-in and /sign-up to dashboard
  if (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected routes to sign-in
  if (!isAuthenticated && isProtectedRoute) {
    console.log('Redirecting unauthenticated user to /sign-in');
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow access to public routes and authenticated users on protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/patient-registration/:path*',
    '/task/:path*',
    '/settings/:path*',
    '/dashboard/:path*',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
