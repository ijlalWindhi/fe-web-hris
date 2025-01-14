import React from "react";
import { Metadata } from "next";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Talent Monitoring ${METADATA.exTitle}`,
  description: `Talent Monitoring page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/talent-monitoring`,
  },
};

export default function TalentMonitoring() {
  return <div>TalentMonitoring</div>;
}
