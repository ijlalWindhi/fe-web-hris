import React from "react";
import { Metadata } from "next";

import MasterDataMain from "@/features/master-data";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Master Data ${METADATA.exTitle}`,
  description: `Master Data page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/master-data`,
  },
};

export default function MasterData() {
  return <MasterDataMain />;
}
