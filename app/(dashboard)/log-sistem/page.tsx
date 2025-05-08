import React from "react";
import { Metadata } from "next";

import LogSystemMain from "@/features/log-system";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Log Sistem ${METADATA.exTitle}`,
  description: `Log Sistem page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/log-sistem`,
  },
};

export default function LogSystem() {
  return <LogSystemMain />;
}
