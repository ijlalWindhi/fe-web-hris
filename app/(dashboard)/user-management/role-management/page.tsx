import React from "react";
import { Metadata } from "next";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Role Management ${METADATA.exTitle}`,
  description: `Role Management page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/user-management/role-management`,
  },
};

export default function RoleManagement() {
  return <div>RoleManagement</div>;
}
