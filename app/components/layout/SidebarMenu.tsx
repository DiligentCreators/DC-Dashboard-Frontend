"use client";

import Link from "next/link";
import { Home, Users, Settings, Shield } from "lucide-react";

const SidebarMenu = () => {
  const role: "admin" | "client" | "user" = "admin"; 

  const menus = {
    admin: [
      { name: "Dashboard", icon: Home, href: "/dashboard" },
      { name: "Users", icon: Users, href: "users" },
      { name: "Roles", icon: Shield, href: "roles" },
      { name: "Settings", icon: Settings, href: "settings" },
    ],
    client: [
      { name: "Client Panel", icon: Home, href: "/dashboard/client" },
      { name: "Settings", icon: Settings, href: "/dashboard/client/settings" },
    ],
    user: [{ name: "User Dashboard", icon: Home, href: "/dashboard/user" }],
  };

  const menu = menus[role];

  return (
    <nav className="h-full p-4 space-y-2">
      {menu.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 p-2 rounded hover:bg-muted text-sm font-medium"
        >
          <item.icon className="w-5 h-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarMenu;


