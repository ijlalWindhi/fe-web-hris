import React from "react";
import { Metadata } from "next";

import { Card } from "@/components/ui/card";
import TalentMapping from "@/features/talent-mapping";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Talent Mapping ${METADATA.exTitle}`,
  description: `Talent Mapping page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/talent-mapping`,
  },
};

export default function TalentMappingList() {
  return (
    <Card>
      <TalentMapping />
    </Card>
  );
}
