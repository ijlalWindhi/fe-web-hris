"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";

import NavItem from "@/components/layout/nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenuDemo } from "@/components/global/notification";

import useTheme from "@/stores/theme";
import useAuth from "@/stores/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils/utils";

function Header() {
  // variables
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isSidebarOpen, toggleSidebar } = useTheme();
  const { menu, profile } = useAuth();
  const isActiveTab = (path: string) =>
    pathname?.split("/")[1] === path?.split("/")[1];

  return (
    <nav
      className={`
        w-full flex justify-between items-center lg:gap-2 xl:gap-6 bg-gray-50 relative z-20
        ${isMobile ? "px-4 py-3" : "lg:pt-4 lg:pb-0 lg:px-4"}
      `}
    >
      <div className="flex items-center gap-1">
        {!isMobile && (
          <Link href="/">
            <Image src="/images/logo.webp" alt="logo" width={120} height={52} />
          </Link>
        )}
        {isMobile && (
          <>
            <Menu
              onClick={toggleSidebar}
              size={24}
              className="border p-1.5 w-8 h-8 md:w-9 md:h-9 rounded-md cursor-pointer"
            />
            <Link href="/" className="pl-4">
              <Image
                src="/images/logo.webp"
                alt="logo"
                width={100}
                height={32}
                className="h-auto w-16"
              />
            </Link>
          </>
        )}
      </div>

      {!isMobile && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div
            className={cn(
              "flex flex-row rounded-full bg-white px-3 py-2 w-auto overflow-x-auto max-w-[75%] min-[1380px]:!max-w-full desktop-header gap-1 md:gap-2",
              {
                ["lg:mx-auto"]: menu.length > 5,
              },
            )}
          >
            {menu.map((menuItem, index) => (
              <NavItem
                key={index}
                menuItem={menuItem}
                isActive={isActiveTab(menuItem?.path)}
                isSidebarOpen={isSidebarOpen}
                pathname={pathname}
                navigationMode="header"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="bg-white rounded-full p-2">
          <Bell size={24} className="cursor-pointer" />
        </div>
        <Link href={"/profile"}>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={profile.image}
              alt="avatar"
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback>
              {profile?.name?.charAt(0)?.toUpperCase() || "-"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
