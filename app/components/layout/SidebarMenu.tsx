'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Users,
  Settings,
  Shield,
  ChevronDown,
  ChevronRight,
  Trash2,
  List
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

const SidebarMenu = () => {
  const role: 'admin' | 'client' | 'user' = 'admin';
  const pathname = usePathname();

  // Determine if "Users" section should be open based on current path
  const isUserSectionActive = pathname.startsWith('/users');
  const [userOpen, setUserOpen] = useState(isUserSectionActive);

  const menus = {
    admin: [
      { name: 'Dashboard', icon: Home, href: '/dashboard' },
      {
        name: 'Users',
        icon: Users,
        children: [
          { name: 'User List', href: '/users', icon: List },
          { name: 'Trash', href: '/trashusers', icon: Trash2 }
        ]
      },
      { name: 'Roles', icon: Shield, href: '/roles' },
      { name: 'Settings', icon: Settings, href: '/settings' }
    ],
    client: [
      { name: 'Client Panel', icon: Home, href: '/dashboard/client' },
      { name: 'Settings', icon: Settings, href: '/dashboard/client/settings' }
    ],
    user: [{ name: 'User Dashboard', icon: Home, href: '/dashboard/user' }]
  };

  const menu = menus[role];

  return (
    <nav className="h-full p-4 space-y-2 text-sm font-medium">
      {menu.map((item) => {
        // If menu has children (nested submenu)
        if (item.children) {
          return (
            <Collapsible key={item.name} open={userOpen} onOpenChange={setUserOpen}>
              <CollapsibleTrigger asChild>
                <button
                  className="flex items-center w-full gap-2 p-2 rounded hover:bg-muted"
                  onClick={() => setUserOpen((prev) => !prev)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {userOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 space-y-1">
                {item.children.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className={`flex items-center gap-2 p-2 rounded hover:bg-muted ${
                      pathname === sub.href ? 'bg-muted font-semibold' : ''
                    }`}
                  >
                    <sub.icon className="w-4 h-4" />
                    {sub.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        // Simple menu item
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 p-2 rounded hover:bg-muted ${
              pathname === item.href ? 'bg-muted font-semibold' : ''
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
