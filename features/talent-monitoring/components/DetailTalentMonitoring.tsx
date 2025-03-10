"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";

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

import { DATA_SIDEBAR } from "@/constants/talent-monitoring";

export default function DetailTalentMonitoring() {
  // variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  // functions
  const handleNavigation = (path: string) => {
    setActivePath(path);

    router.push(
      `${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), path }).toString()}`,
    );
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
            <div className="!mt-6 gap-2 flex flex-col xl:flex-row items-center justify-between w-full">
              <Link
                href="/user-management/role-management"
                className="w-full xl:w-auto"
              >
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="w-full xl:w-auto"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Back
                </Button>
              </Link>
              <Link
                href="/user-management/role-management"
                className="w-full xl:w-auto"
              >
                <Button
                  size={"sm"}
                  className="w-full xl:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  <Download size={16} className="mr-1" />
                  Download
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block min-h-[75vh] w-0.5 bg-gray-200" />
          <div className="w-full lg:w-5/6 px-4">
            <Breadcrumb className="hidden md:flex mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/talent-monitoring">
                    Talent Monitoring
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Detail Talent</BreadcrumbItem>
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
            {activePath === "talent-information" && <TalentInformation />}
            {activePath === "talent-performance" && <TalentPerformance />}
            {activePath === "talent-attendance" && <TalentAttendance />}
            {activePath === "talent-mapping" && <TalentMapping />}
            {activePath === "talent-timesheet" && <TalentTimesheet />}
            {activePath === "contract-management" && <ContractManagement />}
            {activePath === "payroll-details" && <PayrollDetails />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
