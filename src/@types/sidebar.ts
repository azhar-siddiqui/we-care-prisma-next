import { LucideIcon } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: LucideIcon;
}

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  isActive?: boolean;
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  readonly title: string;
  readonly items: ReadonlyArray<NavItem>;
}

interface SidebarData {
  user: User;
  navGroups: NavGroup[];
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData };
