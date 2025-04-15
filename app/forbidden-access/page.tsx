"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("lottie-react"), {
  ssr: false,
});

import { Button } from "@/components/ui/button";

import Error403Animation from "@/public/animations/error403.json";

export default function ForbiddenAccess() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center gap-2 bg-auth bg-cover bg-no-repeat">
      <Player
        autoplay
        loop
        animationData={Error403Animation}
        style={{ height: "300px" }}
      />
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
        Forbidden Access!
      </h1>
      <p className="text-xs sm:text-sm md:text-base">
        You do not have permission to access this page.
      </p>
      <Link href="/">
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
}
