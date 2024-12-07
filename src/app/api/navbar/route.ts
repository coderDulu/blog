import { NextResponse } from 'next/server';
import type { NavbarItem } from '@/types/navbar';

interface NavbarResponse {
  data: NavbarItem[];
}

export async function GET() {
  return NextResponse.json<NavbarResponse>({
    data: [
      { id: 1, icon: 'Home', title: 'Home', url: '/' },
      { id: 2, icon: 'Inbox', title: 'Inbox', url: '/inbox' },
      {
        id: 3,
        icon: 'Settings',
        title: 'Settings',
        url: '/settings',
        children: [
          { id: 3.1, icon: 'Profile', title: 'Profile', url: '/profile' },
          { id: 3.2, icon: 'Settings', title: 'Settings', url: '/settings' },
        ],
      },
    ],
  });
}
