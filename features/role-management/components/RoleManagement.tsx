"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InputSearch from "@/components/common/input-search";
import { PaginationCompo } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import ModalPermission from "./ModalPermission";

import { useRoleList } from "../hooks/useRoleManagement";
import { IResponseRoleManagement, TSearchParams } from "@/types";
import { useSetParams } from "@/utils/set-params";
import useRoleManagement from "@/stores/role-management";

export default function RoleManagement() {
  // variables
  const updateParams = useSetParams();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<TSearchParams>({
    page: parseInt(searchParams.get("page") ?? "1"),
    page_size: parseInt(searchParams.get("page_size") ?? "10"),
    src: searchParams.get("src") ?? undefined,
  });
  const { data } = useRoleList(queryParams);
  const { setSelectedData, toggleModalRole } = useRoleManagement();

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

  const handleClick = (data: IResponseRoleManagement) => {
    setSelectedData(data);
    toggleModalRole(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-[40%]">
          <CardTitle className="font-semibold">Role List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total{" "}
            {data?.meta?.count ?? 0} Role
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <InputSearch
            onSearch={handleSearch}
            placeholder="Search role here..."
            defaultValue={queryParams.src}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {data?.data?.map((role) => {
            const permissions = role?.permission || [];
            const displayedPermissions = permissions.slice(0, 4);
            const remainingPermissions = permissions.length - 4;

            return (
              <div key={role.id} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium capitalize">{role.name}</h2>
                  <Badge variant={"outline"} className="w-fit">
                    <span className="text-primary">•</span> Total{" "}
                    {role.total_user} User
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {displayedPermissions.map((permission) => (
                    <li key={permission.id} className="text-sm capitalize">
                      <span className="text-primary mr-1">•</span>{" "}
                      {permission.permission ?? "-"}{" "}
                      {permission.module?.nama ?? "-"}
                    </li>
                  ))}
                  {remainingPermissions > 0 && (
                    <li className="text-sm capitalize">
                      <span className="text-primary mr-1">•</span> And{" "}
                      {remainingPermissions} more...
                    </li>
                  )}
                </ul>
                <div className="flex justify-between gap-4">
                  <Link
                    href={`/user-management/role-management/${role.id}`}
                    className="w-full"
                  >
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="!mt-4 w-full"
                    >
                      View More
                    </Button>
                  </Link>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="!mt-4 w-full"
                    onClick={() => handleClick(role)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <PaginationCompo
          meta={{
            page: queryParams.page,
            page_size: queryParams.page_size,
            count: data?.meta?.count ?? 0,
            page_count: Math.ceil(
              (data?.meta?.count ?? 0) / queryParams.page_size,
            ),
          }}
          onPageChange={(data) => handlePageChange(data)}
        />
      </CardFooter>
      <ModalPermission />
    </Card>
  );
}
