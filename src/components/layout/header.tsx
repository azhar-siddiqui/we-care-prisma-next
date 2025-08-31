'use client';

import { ProfileDropdown } from '../common/profile-dropdown';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';
import { Search } from '../ui/search';
import { SidebarTrigger } from '../ui/sidebar';

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4 px-4">
        <div className="hidden md:flex">
          <Search />
        </div>
        <div className="flex items-center gap-x-2">
          <AnimatedThemeToggler />
          <div className="hidden md:flex">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
