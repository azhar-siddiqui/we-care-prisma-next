import { LoggedInAdminUser, LoggedInUser } from '@/@types/login-user';
import { AppSidebar } from '@/components/common/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-context';
import { UserProvider } from '@/context/user-context';
import { verifyToken } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const loggedInAdminUserToken = cookieStore.get('ADMIN_token')?.value;
  const loggedInUserToken = cookieStore.get('USER_token')?.value;

  let loggedInUser: LoggedInAdminUser | LoggedInUser | null = null;
  if (loggedInAdminUserToken) {
    loggedInUser = await verifyToken(loggedInAdminUserToken);
  } else if (loggedInUserToken) {
    loggedInUser = await verifyToken(loggedInUserToken);
  }

  return (
    <UserProvider user={loggedInUser}>
      <SearchProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div
            id="content"
            className={cn(
              'ml-auto w-full max-w-full',
              'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
              'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
              'sm:transition-[width] sm:duration-200 sm:ease-linear',
              'flex h-svh flex-col',
              'group-data-[scroll-locked=1]/body:h-full',
              'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
            )}
          >
            {children}
          </div>
        </SidebarProvider>
      </SearchProvider>
    </UserProvider>
  );
}
