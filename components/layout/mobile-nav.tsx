"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import NavItem from "@/components/layout/nav-item";

import useTheme from "@/stores/theme";
import useAuth from "@/stores/auth";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileNav() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useTheme();
  const { menu } = useAuth();
  const isMobile = useIsMobile();
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>(
    {},
  );

  const isActiveTab = (path: string) => pathname === path;

  const toggleSubMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  if (isMobile) {
    return isSidebarOpen ? (
      <div className="fixed inset-0 z-50 bg-white w-full h-full overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/">
            <Image
              src="/images/logo.webp"
              alt="logo"
              width={120}
              height={32}
              className="h-auto w-16"
            />
          </Link>
          <X
            onClick={toggleSidebar}
            size={24}
            className="border p-1.5 w-8 h-8 md:w-9 md:h-9 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          {menu.map((menuItem, index) => (
            <NavItem
              key={index}
              menuItem={menuItem}
              isActive={isActiveTab(menuItem.path)}
              isOpen={openMenus[menuItem.title]}
              toggleSubMenu={toggleSubMenu}
              isSidebarOpen={true}
              toggleSidebar={toggleSidebar}
              pathname={pathname}
              navigationMode="sidebar"
            />
          ))}
        </div>
      </div>
    ) : null;
  }
}
