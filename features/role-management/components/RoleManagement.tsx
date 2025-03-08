"use client";
import React from "react";

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
import Link from "next/link";

export default function RoleManagement() {
  // functions
  const handleSearch = (searchTerm: string) => {
    try {
      console.log(searchTerm);
    } catch (error) {
      console.error("Error from handleSearch: ", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-[40%]">
          <CardTitle className="font-semibold">Role List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total 100 Role
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <InputSearch
            onSearch={handleSearch}
            placeholder="Search role here..."
            defaultValue={""}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          <div className="space-y-2 p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <h2 className="font-medium">Super Admin</h2>
              <Badge variant={"outline"} className="w-fit">
                <span className="text-primary">•</span> Total 100 User
              </Badge>
            </div>
            <ul className="space-y-1">
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> View User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> Create User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> Update User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> And 10 more...
              </li>
            </ul>
            <Link href="/user-management/role-management/super-admin">
              <Button variant={"outline"} size={"sm"} className="!mt-4 w-1/2">
                View More
              </Button>
            </Link>
          </div>
          <div className="space-y-2 p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <h2 className="font-medium">Admin</h2>
              <Badge variant={"outline"} className="w-fit">
                <span className="text-primary">•</span> Total 100 User
              </Badge>
            </div>
            <ul className="space-y-1">
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> View User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> Create User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> Update User
              </li>
              <li className="text-sm">
                <span className="text-primary mr-1">•</span> And 10 more...
              </li>
            </ul>
            <Link href="/user-management/role-management/super-admin">
              <Button variant={"outline"} size={"sm"} className="!mt-4 w-1/2">
                View More
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PaginationCompo
          meta={{
            page: 1,
            page_size: 10,
            count: 100,
            page_count: 10,
          }}
          onPageChange={(page) => console.log(page)}
        />
      </CardFooter>
    </Card>
  );
}
