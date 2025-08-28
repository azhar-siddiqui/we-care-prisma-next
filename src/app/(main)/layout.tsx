import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="content"
      className={cn(
        'w-full max-w-full',
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
  );
}
