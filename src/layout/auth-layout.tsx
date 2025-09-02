import { LoggedInAdminUser, LoggedInUser } from '@/@types/login-user';
import { UserProvider } from '@/context/user-context';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const loggedInAdminUserToken = cookieStore.get('ADMIN_token')?.value;
  const loggedInUserToken = cookieStore.get('USER_token')?.value;

  let loggedInUser: LoggedInAdminUser | LoggedInUser | null = null;
  if (loggedInAdminUserToken) {
    loggedInUser = await verifyToken(loggedInAdminUserToken);
  } else if (loggedInUserToken) {
    loggedInUser = await verifyToken(loggedInUserToken);
  }
  return <UserProvider user={loggedInUser}>{children}</UserProvider>;
}
