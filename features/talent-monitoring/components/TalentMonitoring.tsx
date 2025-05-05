"use client";
import React, { useCallback, useState, useEffect } from "react";
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
import List from "./List";
import Filter from "@/components/common/filter";

import { TSearchParams } from "@/types";
import { useSetParams } from "@/utils/set-params";
import { useTalentMonitoringList } from "../hooks/useTalentMonitoring";
import { hasPermission } from "@/utils/get-permission";

export default function TalentMonitoring() {
  // variables
  const updateParams = useSetParams();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<TSearchParams>({
    page: parseInt(searchParams.get("page") ?? "1"),
    page_size: parseInt(searchParams.get("page_size") ?? "10"),
    src: searchParams.get("src") ?? undefined,
    client_id: searchParams.get("client_id") ?? undefined,
    outlet_id: searchParams.get("outlet_id") ?? undefined,
  });
  const { data, refetch } = useTalentMonitoringList(queryParams);

  // functions
  const handleSearch = useCallback(
    async (searchTerm: string) => {
      try {
        const newParams: TSearchParams = {
          ...queryParams,
          src: searchTerm || undefined,
          client_id: queryParams.client_id,
          outlet_id: queryParams.outlet_id,
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

  // lifecycle
  useEffect(() => {
    setQueryParams({
      page: parseInt(searchParams.get("page") ?? "1"),
      page_size: parseInt(searchParams.get("page_size") ?? "10"),
      src: searchParams.get("src") ?? undefined,
      client_id: searchParams.get("client_id") ?? undefined,
      outlet_id: searchParams.get("outlet_id") ?? undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-[40%]">
          <CardTitle className="font-semibold">TAD List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total{" "}
            {data?.meta?.count ?? 0} TAD
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <InputSearch
            onSearch={handleSearch}
            placeholder="Search TAD here..."
            defaultValue={queryParams.src}
          />
          <Filter
            ownClient={hasPermission("Talent Monitoring", "own client")}
          />
        </div>
      </CardHeader>
      <CardContent>
        <List queryParams={queryParams} />
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
    </Card>
  );
}
