"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/header";
import Navbar from "@/components/layout/mobile-nav";

import { useIsMobile } from "@/hooks/use-mobile";
import useTheme from "@/stores/theme";
import useAuth from "@/stores/auth";
import { INavItem, TPermission } from "@/types";

export function ClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // variables
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useTheme();
  const { permission, menu } = useAuth();

  // functions
  const findMenuItemByPath = (
    items: INavItem[],
    currentPath: string,
  ): INavItem | null => {
    // Helper function to check if path matches, including dynamic segments
    const isPathMatch = (menuPath: string, currentPath: string): boolean => {
      // Convert menu path pattern into regex pattern
      const pathPattern = menuPath
        .replace(/\{dynamic\}/g, "[^/]+") // Replace {dynamic} with regex for any characters except /
        .replace(/\//g, "\\/"); // Escape forward slashes

      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(currentPath);
    };

    // Recursive function to search through menu items
    const searchMenu = (menuItems: INavItem[]): INavItem | null => {
      for (const item of menuItems) {
        if (isPathMatch(item.path, currentPath)) {
          return item;
        }

        if (Array.isArray(item.sub)) {
          const foundItem = searchMenu(item.sub);
          if (foundItem) {
            return foundItem;
          }
        }
      }
      return null;
    };

    return searchMenu(items);
  };

  const getModuleNameFromTitle = (title: string): string => {
    const moduleMapping: { [key: string]: string } = {
      Dashboard: "Dashboard",
      "TAD Mapping": "Talent Mapping",
      "TAD Monitoring": "Talent Monitoring",
      "Detail Talent Monitoring": "Talent Monitoring",
      "Client Billing": "Client Billing",
      "Master Client": "Master Client",
      "User Management": "User Management",
      "Role Management": "Role Management",
      "Detail Role Management": "Role Management",
      "Master Data": "Master Data",
      "History Payment": "History Payment",
    };

    return moduleMapping[title] || title;
  };

  async function checkUserPermission() {
    try {
      if (
        permission.length === 0 ||
        menu.length === 0 ||
        pathname === "/profile"
      )
        return;

      // Find current menu item
      const currentMenuItem = findMenuItemByPath(menu, pathname);

      if (!currentMenuItem && permission.length > 0 && menu.length > 0) {
        console.warn(`No menu item found for path: ${pathname}`);
        window.location.href = "/forbidden-access";
        return;
      }

      // Get module name for current menu item
      const moduleName = getModuleNameFromTitle(currentMenuItem?.title ?? "");

      // Check if user has permission for this module
      const hasPermission = permission.some(
        (p: TPermission) =>
          p.module.nama === moduleName && p.permission === "view",
      );

      if (!hasPermission) {
        // Redirect to forbidden page if no permission
        window.location.href = "/forbidden-access";
      }
    } catch (error) {
      console.error("Error from checkUserPermission: ", error);
    }
  }

  // lifecycle
  useEffect(() => {
    checkUserPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, menu]);

  return (
    <div className="min-h-screen h-full bg-gray-50">
      <div className="relative flex min-h-screen flex-col">
        <Header />

        {isMobile && <Navbar />}

        <main
          className="flex-1 space-y-4 p-2 md:p-4"
          onClick={() => {
            if (isSidebarOpen && isMobile) {
              toggleSidebar();
            }
          }}
        >
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => toggleSidebar()}
            />
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
