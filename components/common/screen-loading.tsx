"use client";
import React from "react";
import { Loader2 } from "lucide-react";

import useTheme from "@/stores/theme";

export default function ScreenLoading() {
  const { isLoading } = useTheme();

  return (
    isLoading && (
      <div className="w-full h-full flex items-center justify-center bg-gray-500/60 z-50 absolute">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  );
}
