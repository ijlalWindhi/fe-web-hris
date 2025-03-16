"use client";
import React, { useEffect } from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataRow from "@/components/common/data-row";
import InputProfile from "@/components/common/input-profile";

import { truncateText } from "@/utils/truncate";
import { useIsMobile } from "@/hooks/use-mobile";
import useAuth from "@/stores/auth";

export default function Profile() {
  // variables
  const isMobile = useIsMobile();
  const { profile, getProfile } = useAuth();

  // lifecycle
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="w-full">
      <div className="w-full h-20 md:h-36 bg-gradient-to-tr from-blue-200 to-blue-400 rounded-2xl relative">
        <div className="absolute -bottom-10 md:-bottom-12 w-full">
          <div className="w-full flex justify-between items-end px-4 md:px-10">
            <div className="flex items-end gap-2 md:gap-4">
              <InputProfile
                width="w-16 md:w-24"
                height="h-16 md:h-24"
                shouldChange={false}
              />
              <div>
                <h1 className="font-semibold md:text-lg lg:text-2xl">
                  {truncateText(profile?.name, isMobile ? 16 : 100)}
                </h1>
                <p className="text-xs md:text-sm">
                  {profile?.role?.name ?? "-"}
                </p>
              </div>
            </div>
            <Button className="mt-2" variant="outline">
              <LogOut />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <Card className="mt-16 md:mt-20">
        <dl className="divide-y">
          <DataRow label="User ID" value={profile?.id} />
          <DataRow label="Name" value={profile?.name} />
          <DataRow label="Email Address" value={profile?.email} />
          <DataRow label="Number Phone" value={profile?.phone} />
          <DataRow label="Address" value={profile?.email} />
        </dl>
      </Card>
    </div>
  );
}
