import { SidebarData } from '@/@types/sidebar';
import {
  Bell,
  Boxes,
  CalendarCheck,
  FileQuestionMark,
  FolderCog,
  LayoutDashboard,
  ListChecks,
  MessagesSquare,
  Palette,
  Settings,
  UserCog,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';

export const sidebarData: SidebarData = {
  user: {
    name: 'Azhar Siddiqui',
    email: 'azharsiddiqui@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'New Registration',
          url: '/patient-registration',
          icon: UserPlus,
        },
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: ListChecks,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Boxes,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Manage Test Settings',
      items: [
        {
          title: 'Test',
          icon: Settings,
          isActive: true,
          items: [
            {
              title: 'Manage Test',
              url: '/test',
              icon: FolderCog,
            },
            {
              title: 'Add New Test',
              url: '/test/new',
              icon: UserCog,
            },
          ],
        },
      ],
    },
    {
      title: 'User Settings',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          isActive: true,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: CalendarCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: FileQuestionMark,
        },
      ],
    },
  ],
};
