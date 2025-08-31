'use client';

import { ChevronsUpDown, Command } from 'lucide-react';
import * as React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';

export function TeamSwitcher() {
  const [activeTeam] = React.useState({
    name: 'Medicare Pathology',
    logo: Command,
    plan: 'Premium',
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <activeTeam.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
