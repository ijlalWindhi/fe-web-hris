import React from "react";
import { Metadata } from "next";

import MasterClientMain from "@/features/master-client";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Master Client ${METADATA.exTitle}`,
  description: `Master Client page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/master-client`,
  },
};

export default function MasterClient() {
  return <MasterClientMain />;
}
