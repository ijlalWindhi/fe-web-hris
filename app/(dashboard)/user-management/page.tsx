import React from "react";
import { Metadata } from "next";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `User Management ${METADATA.exTitle}`,
  description: `User Management page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/user-management`,
  },
};

export default function UserManagement() {
  return <div>UserManagement</div>;
}
