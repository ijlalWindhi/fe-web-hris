import React from "react";
import { Metadata } from "next";

import HistoryPaymentCompo from "@/features/history-payment";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `History Payment ${METADATA.exTitle}`,
  description: `History Payment page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/history-payment`,
  },
};

export default function HistoryPayment() {
  return <HistoryPaymentCompo />;
}
