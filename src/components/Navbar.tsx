'use client';
import { AlignJustify } from 'lucide-react';
// import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NavbarItem } from '@/types/navbar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
async function fetchNavbarData() {
  const response = await fetch('/api/navbar');
  if (!response.ok) {
    throw new Error('Failed to fetch navbar data');
  }
  return response.json();
}

export default function AppSidebar() {
  const [navbarData, setNavbarData] = useState<NavbarItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNavbarData()
      .then((data) => {
        setNavbarData(data.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                {navbarData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <div className="cursor-pointer">
                          <Link href={item.url}>{item.title}</Link>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <SidebarMenuBadge>{item.children?.length}</SidebarMenuBadge>

                    <CollapsibleContent>
                      {item.children && (
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <Link href={child.url}>{child.title}</Link>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Sheet>
        <SheetTrigger className='md:hidden block'>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side={'top'}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Sidebar>
  );
}
