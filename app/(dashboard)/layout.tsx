import React from "react";
import { ClientLayoutWrapper } from "@/components/layout/layout-dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
