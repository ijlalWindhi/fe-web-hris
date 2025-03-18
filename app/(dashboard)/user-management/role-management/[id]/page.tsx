import React from "react";
import { Metadata } from "next";

import DetailRoleManagementMain from "@/features/role-management/components/DetailRoleManagement";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Detail Role Management ${METADATA.exTitle}`,
  description: `Detail Role Management page to show details of a role`,
  alternates: {
    canonical: `${process.env.DOMAIN}/user-management/role-management/[id]`,
  },
};

export default async function DetailRoleManagement({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailRoleManagementMain id={id} />;
}
