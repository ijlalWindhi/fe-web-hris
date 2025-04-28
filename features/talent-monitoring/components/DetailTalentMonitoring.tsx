"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, Download, Smartphone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ContractManagement from "./ContractManagement";
import PayrollDetails from "./PayrollDetails";
import TalentInformation from "./TalentInformation";
import TalentPerformance from "./TalentPerformance";
import TalentAttendance from "./TalentAttendance";
import TalentMapping from "./TalentMapping";
import TalentTimesheet from "./TalentTimesheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DATA_SIDEBAR } from "@/constants/talent-monitoring";
import {
  useTalentInformation,
  useResetDevice,
} from "../hooks/useTalentMonitoring";
import { hasPermission } from "@/utils/get-permission";
import useTheme from "@/stores/theme";

interface IDetailTalentMonitoringProps {
  id: string;
}

export default function DetailTalentMonitoring({
  id,
}: Readonly<IDetailTalentMonitoringProps>) {
  // variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setModalSuccess } = useTheme();
  const [activePath, setActivePath] = useState("");
  const { data } = useTalentInformation(id);
  const resetDeviceMutate = useResetDevice();

  // functions
  const handleNavigation = (path: string) => {
    setActivePath(path);

    router.push(
      `${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), path }).toString()}`,
    );
  };

  const resetDevice = async () => {
    try {
      await resetDeviceMutate.mutateAsync(id);
      setModalSuccess({
        open: true,
        title: "Reset Device Successfully!",
        message:
          "Device has been reset successfully. You can now log in to your account.",
        actionVariant: "default",
        actionMessage: "Back",
        action: () => {},
      });
    } catch (error) {
      console.error("Error resetting device:", error);
    }
  };

  // lifecycle
  useEffect(() => {
    const pathFromQuery = searchParams.get("path");
    const pathFromUrl = pathname.split("/").pop();

    if (!pathFromQuery) {
      router.push(
        `${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), path: "talent-information" }).toString()}`,
      );
    }

    const currentPath = pathFromQuery ?? pathFromUrl ?? "talent-information";
    setActivePath(currentPath);
  }, [router, searchParams, pathname]);

  return (
    <Card>
      <CardContent>
        <div className="w-full flex flex-col lg:flex-row justify-start gap-4">
          <div className="lg:min-h-[75vh] w-full lg:w-1/6 flex flex-col md:justify-between md:gap-4">
            <div className="space-y-2">
              {DATA_SIDEBAR.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`cursor-pointer transition-colors duration-200 flex items-center justify-between w-full px-4 py-2 rounded-full text-sm ${
                    activePath === item.path
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Link href="/talent-monitoring" className="w-full">
                <Button variant={"outline"} size={"sm"} className="w-full">
                  <ChevronLeft size={16} className="mr-1" />
                  Back
                </Button>
              </Link>
              {hasPermission("Talent Monitoring", "reset device") && (
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="w-full"
                  onClick={resetDevice}
                >
                  <Smartphone size={16} className="mr-1" />
                  Reset Device
                </Button>
              )}
            </div>
          </div>
          <div className="hidden lg:block min-h-[75vh] w-0.5 bg-gray-200" />
          <div className="w-full lg:w-5/6 px-4 max-h-[75vh] overflow-y-auto">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/talent-monitoring">
                    TAD Monitoring
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Detail TAD</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {
                      DATA_SIDEBAR.find((item) => item.path === activePath)
                        ?.label
                    }
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="my-3 md:my-4 w-full h-20 bg-gradient-to-tr from-gray-50 to-gray-200 rounded-2xl flex items-center justify-start px-4 py-6 gap-2 border">
              <Avatar className={"w-14 h-14"}>
                <AvatarImage
                  src={data?.data?.photo || "/images/unavailable-profile.webp"}
                  alt="avatar"
                  className="object-cover w-full h-full rounded-full"
                />
                <AvatarFallback />
              </Avatar>
              <div>
                <h1 className="font-semibold md:text-lg">
                  {data?.data?.name ?? "-"}
                </h1>
                <p className="text-xs md:text-sm text-gray-500">
                  {data?.data?.role?.name ?? "-"}
                </p>
              </div>
            </div>
            {activePath === "talent-information" && (
              <TalentInformation talentId={id} />
            )}
            {activePath === "talent-performance" && (
              <TalentPerformance talentId={id} />
            )}
            {activePath === "talent-attendance" && (
              <TalentAttendance talentId={id} />
            )}
            {activePath === "talent-mapping" && <TalentMapping talentId={id} />}
            {activePath === "talent-timesheet" && (
              <TalentTimesheet talentId={id} />
            )}
            {activePath === "contract-management" && (
              <ContractManagement talentId={id} />
            )}
            {activePath === "payroll-details" && (
              <PayrollDetails talentId={id} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
