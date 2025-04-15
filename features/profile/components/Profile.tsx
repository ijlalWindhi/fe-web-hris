"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataRow from "@/components/common/data-row";
import InputProfile from "@/components/common/input-profile";

import { truncateText } from "@/utils/truncate";
import { deleteCookie } from "@/utils/cookie";
import { useIsMobile } from "@/hooks/use-mobile";
import useAuth from "@/stores/auth";
import { uploadFile } from "@/services/file";
import { useUpdateUserManagement } from "@/features/user-management/hooks/useUserManagement";

export default function Profile() {
  // variables
  const router = useRouter();
  const isMobile = useIsMobile();
  const updateUserManagement = useUpdateUserManagement();
  const { profile, getProfile, logout } = useAuth();

  // functions
  const handleLogout = () => {
    try {
      deleteCookie("token");
      logout();
      router.push("/auth/login");
      localStorage.removeItem(`${process.env.NEXT_PUBLIC_STORAGE_NAME}:auth`);
    } catch (error) {
      console.error("Error from handleLogout: ", error);
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      const response = await uploadFile(file);
      const payload = {
        name: profile?.name,
        email: profile?.email,
        phone: profile?.phone,
        role_id: profile?.role?.id,
        address: profile?.address,
        photo: response,
        status: true,
      };
      await updateUserManagement.mutateAsync({
        id: profile?.id,
        data: payload,
      });
      await getProfile();
    } catch (error) {
      console.error("Error from handleUploadImage: ", error);
    }
  };

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
                defaultImage={profile?.image}
                onFileChange={(file) => handleUploadImage(file)}
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
            <Button className="mt-2" variant="outline" onClick={handleLogout}>
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
          <DataRow label="Address" value={profile?.address} />
        </dl>
      </Card>
    </div>
  );
}
