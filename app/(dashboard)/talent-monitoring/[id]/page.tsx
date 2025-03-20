import React from "react";
import { Metadata } from "next";

import DetailTalentMonitoringMain from "@/features/talent-monitoring/components/DetailTalentMonitoring";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Detail Talent Monitoring ${METADATA.exTitle}`,
  description: `Detail Talent Monitoring page to show detail the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/talent-monitoring/[id]`,
  },
};

export default async function DetailTalentMonitoring({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailTalentMonitoringMain id={id} />;
}
