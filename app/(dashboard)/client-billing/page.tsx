import React from "react";
import { Metadata } from "next";

import ClientBillingCompo from "@/features/client-billing";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Client Billing ${METADATA.exTitle}`,
  description: `Client Billing page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/client-billing`,
  },
};

export default function ClientBilling() {
  return <ClientBillingCompo />;
}
