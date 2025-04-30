import React from "react";
import { Metadata } from "next";

import ClaimCompensationMain from "@/features/claim-compensation";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Claim Compensation ${METADATA.exTitle}`,
  description: `Claim Compensation page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/claim-compensation`,
  },
};

export default function ClaimCompensation() {
  return <ClaimCompensationMain />;
}
