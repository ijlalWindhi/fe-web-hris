import React from "react";
import { Metadata } from "next";

import TalentMonitoringMain from "@/features/talent-monitoring";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `TAD Monitoring ${METADATA.exTitle}`,
  description: `TAD Monitoring page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/talent-monitoring`,
  },
};

export default function TalentMonitoring() {
  return <TalentMonitoringMain />;
}
