"use client";
import React from "react";

import Header from "@/components/layout/header";
import Navbar from "@/components/layout/mobile-nav";

import { useIsMobile } from "@/hooks/use-mobile";
import useTheme from "@/stores/theme";

export function ClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();
  const { isSidebarOpen, toggleSidebar } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50">
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
