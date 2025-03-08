import React from "react";
import { Metadata } from "next";

import ProfileMain from "@/features/profile";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Profile ${METADATA.exTitle}`,
  description: `Profile page to show information about the user`,
  alternates: {
    canonical: `${process.env.DOMAIN}/profile`,
  },
};

export default function Profile() {
  return <ProfileMain />;
}
