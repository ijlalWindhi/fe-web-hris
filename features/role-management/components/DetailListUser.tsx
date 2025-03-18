"use client";
import React from "react";
import dynamic from "next/dynamic";

import { PaginationCompo } from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import InputSearch from "@/components/common/input-search";
const ModalUserManagement = dynamic(
  () => import("@/features/user-management/components/ModalUserManagement"),
);
import List from "./List";

import { TSearchParams } from "@/types";
import { useUserRole, useRoleDetail } from "../hooks/useRoleManagement";

interface IDetailListUserProps {
  id: string;
  queryParams: TSearchParams;
  handleSearch: (searchTerm: string) => void;
  handlePageChange: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
}

export default function DetailListUser({
  id,
  queryParams,
  handleSearch,
  handlePageChange,
}: Readonly<IDetailListUserProps>) {
  // variables
  const { data } = useUserRole(id, queryParams);
  const { data: roleData } = useRoleDetail(id);

  return (
    <div className="flex flex-col gap-4 w-full lg:w-3/4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user-management/role-management">
                Role Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {roleData?.data?.role_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full md:w-1/3 xl:w-1/4">
          <InputSearch
            onSearch={handleSearch}
            placeholder="Search user here..."
            defaultValue={queryParams.src}
          />
        </div>
      </div>
      <List queryParams={queryParams} id={id} />
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
      <ModalUserManagement />
    </div>
  );
}
