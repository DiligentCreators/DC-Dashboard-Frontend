"use client";

import { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import Header from './Header'
type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r bg-gray-50 dark:bg-gray-900">
        <SidebarMenu />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarMenu />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
