"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DetailListUser from "./DetailListUser";

import {
  useRoleDetail,
  useUserRole,
} from "@/features/role-management/hooks/useRoleManagement";
import { TSearchParams } from "@/types";
import { useSetParams } from "@/utils/set-params";

export default function DetailRoleManagement({ id }: { readonly id: string }) {
  // variables
  const updateParams = useSetParams();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<TSearchParams>({
    page: parseInt(searchParams.get("page") ?? "1"),
    page_size: parseInt(searchParams.get("page_size") ?? "10"),
    src: searchParams.get("src") ?? undefined,
  });
  const { data: roleData } = useUserRole(id, queryParams);
  const { data, isLoading } = useRoleDetail(id);

  // functions
  const handleSearch = useCallback(
    async (searchTerm: string) => {
      try {
        const newParams: TSearchParams = {
          ...queryParams,
          src: searchTerm || undefined,
          page: 1,
        };

        setQueryParams(newParams);
        updateParams(newParams);
      } catch (error) {
        console.error("Error from handleSearch: ", error);
      }
    },
    [queryParams, updateParams],
  );

  const handlePageChange = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    try {
      const newParams: TSearchParams = {
        ...queryParams,
        page: page,
        page_size: pageSize,
      };

      setQueryParams(newParams);
      updateParams(newParams);
    } catch (error) {
      console.error("Error from handlePageChange:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="w-full flex flex-col lg:flex-row justify-start gap-4">
          <div className="lg:min-h-[75vh] w-full lg:w-1/4 flex flex-col md:justify-between md:gap-4">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="md:text-lg font-semibold">Super Admin</h2>
                <Badge variant={"outline"} className="w-fit">
                  <span className="text-primary">•</span> Total{" "}
                  {roleData?.meta?.count ?? 0} User
                </Badge>
              </div>
              <ul className="space-y-1">
                {isLoading && (
                  <li>
                    <Loader2 className="h-6 w-6 mx-auto animate-spin text-primary" />
                  </li>
                )}
                {data?.data?.permission?.map((permission) => (
                  <li key={permission.id} className="text-sm capitalize">
                    <span className="text-primary mr-1">•</span>{" "}
                    {permission.permission ?? "-"}{" "}
                    {permission.module?.nama ?? "-"}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/user-management/role-management">
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full lg:w-1/2 !mt-6"
              >
                <ChevronLeft size={16} />
                Back
              </Button>
            </Link>
          </div>
          <div className="hidden lg:block min-h-[75vh] w-0.5 bg-gray-200" />
          <DetailListUser
            id={id}
            queryParams={queryParams}
            handleSearch={handleSearch}
            handlePageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
