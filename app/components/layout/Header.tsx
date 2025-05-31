      "use client";
      import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
      } from "@/components/ui/sheet";
      import { useEffect, useState } from "react";
      import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
      import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
      } from "@/components/ui/select";
      import {
      Menubar,
      MenubarContent,
      MenubarItem,
      MenubarMenu,
      MenubarTrigger,
      } from "@/components/ui/menubar";
      import { Bell } from "lucide-react";
      import { useAuth } from '@/app/hook/auth'
      const Header = () => {
      const [theme, setTheme] = useState("system");

      useEffect(() => {
      const saved = localStorage.getItem("theme");
      if (saved) {
      applyTheme(saved);
      setTheme(saved);
      } else {
      applyTheme("system");
      }
      }, []);

      const applyTheme = (value: string) => {
      if (value === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      } else if (value === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      } else {
      // system
      localStorage.setItem("theme", "system");
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
      document.documentElement.classList.add("dark");
      } else {
      document.documentElement.classList.remove("dark");
      }
      }
      };

      const handleChange = (value: string) => {
      setTheme(value);
      applyTheme(value);
      };
        const { logout } = useAuth({ middleware: 'auth' })


        return (
        <header className="p-4 shadow-sm bg-white dark:bg-gray-900 border-b flex justify-between">
          <div>
            <h1 className="text-xl font-semibold md:ml-0 ml-8">Dashboard</h1>
          </div>
          <div className="flex space-x-1">
            <Sheet>
              <SheetTrigger asChild>
                <Bell className="mt-2"/>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Profile</MenubarItem>
                  <MenubarItem>Billing</MenubarItem>
                  <MenubarItem>Settings</MenubarItem>
                  <MenubarItem onClick={logout}>Logout</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Select value={theme} onValueChange={handleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
      );
      };

      export default Header;
