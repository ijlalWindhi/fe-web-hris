import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { Manrope } from "next/font/google";

import { METADATA } from "@/constants/metadata";
import { Toaster } from "@/components/ui/toaster";
import ModalSuccess from "@/components/common/modal-success";
import ScreenLoading from "@/components/common/screen-loading";

import Providers from "../lib/react-query";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex items-center justify-center text-primary">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          <ScreenLoading />
          <ModalSuccess />
          <Toaster />
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
