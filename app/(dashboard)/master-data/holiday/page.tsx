import React from "react";
import { Metadata } from "next";

import HolidayMain from "@/features/master-data";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Holiday ${METADATA.exTitle}`,
  description: `Holiday page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/master-data/holiday`,
  },
};

export default function Holiday() {
  return <HolidayMain />;
}
