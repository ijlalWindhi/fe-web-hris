"use client";
import React from "react";

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
import List from "@/features/user-management/components/List";

export default function DetailListUser() {
  // functions
  const handleSearch = (searchTerm: string) => {
    try {
      console.log(searchTerm);
    } catch (error) {
      console.error("Error from handleSearch: ", error);
    }
  };

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
              <BreadcrumbPage>Super Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full md:w-1/3 xl:w-1/4">
          <InputSearch
            onSearch={handleSearch}
            placeholder="Search user here..."
            defaultValue={""}
          />
        </div>
      </div>
      <List />
      <PaginationCompo
        meta={{
          page: 1,
          page_size: 10,
          count: 100,
          page_count: 10,
        }}
        onPageChange={(page) => console.log(page)}
      />
    </div>
  );
}
