import React from "react";
import { Metadata } from "next";

import TypeTadMain from "@/features/type-tad";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Type TAD ${METADATA.exTitle}`,
  description: `Type TAD page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/master-data/type-tad`,
  },
};

export default function TypeTad() {
  return <TypeTadMain />;
}
