import React from "react";
import { Metadata } from "next";

import TalentMapping from "@/features/talent-mapping";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `TAD Mapping ${METADATA.exTitle}`,
  description: `TAD Mapping page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/talent-mapping`,
  },
};

export default function TalentMappingList() {
  return <TalentMapping />;
}
