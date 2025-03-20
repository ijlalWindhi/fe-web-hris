import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { useTalentInformation } from "../hooks/useTalentMonitoring";

interface ITalentInformationProps {
  talentId: string;
}

export default function TalentInformation({
  talentId,
}: Readonly<ITalentInformationProps>) {
  // variables
  const { data, isLoading } = useTalentInformation(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="md:text-lg font-semibold">Talent Information</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Talent ID</p>
              <p className="font-medium">{data?.data?.talent_id ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{data?.data?.dob ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{data?.data?.phone ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{data?.data?.address ?? "-"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Talent Name</p>
              <p className="font-medium">{data?.data?.name ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">ID Number</p>
              <p className="font-medium">{data?.data?.nik ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{data?.data?.email ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Selfie Photo</p>
              <div className="mt-1">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                  <Image
                    src={"/images/unavailable-profile.webp"}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
