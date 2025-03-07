import React from "react";
import { Metadata } from "next";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Detail Role Management ${METADATA.exTitle}`,
  description: `Detail Role Management page to show details of a role`,
  alternates: {
    canonical: `${process.env.DOMAIN}/user-management/role-management/[id]`,
  },
};

export default function DetailRoleManagement() {
  return <div>DetailRoleManagement</div>;
}
