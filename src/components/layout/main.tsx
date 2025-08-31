import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Main({
  children,
  scrollable = true,
}: Readonly<{
  children: React.ReactNode;
  scrollable?: boolean;
}>) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="flex flex-1 p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
      )}
    </>
  );
}
