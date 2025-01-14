import { Metadata } from "next";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Dashboard ${METADATA.exTitle}`,
  description: `Dashboard page to show all the data`,
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
};

export default function Home() {
  return <h1>Dashboard</h1>;
}
