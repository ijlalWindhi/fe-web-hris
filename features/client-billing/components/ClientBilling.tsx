"use client";
import React, { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationCompo } from "@/components/ui/pagination";
import InputSearch from "@/components/common/input-search";
import List from "./List";
import DetailClientBilling from "./DetailClientBilling";

import useTheme from "@/stores/theme";
import { TSearchParams } from "@/types";
import { useSetParams } from "@/utils/set-params";
import { useMasterClientList } from "@/features/master-client/hooks/useMasterClient";
import ModalDetailBilling from "./ModalDetailBilling";

export default function ClientBilling() {
  // variables
  const { setModalSuccess } = useTheme();
  const updateParams = useSetParams();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<TSearchParams>({
    page: parseInt(searchParams.get("page") ?? "1"),
    page_size: parseInt(searchParams.get("page_size") ?? "10"),
    src: searchParams.get("src") ?? undefined,
  });
  const { data } = useMasterClientList(queryParams);

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

  const handleDownload = () => {
    try {
      setModalSuccess({
        open: true,
        title: "Download Successful!",
        message:
          "The client billing data has been downloaded successfully. You can now review it on your device.",
        actionMessage: "Close",
        actionVariant: "outline",
        animation: "success",
        action: () => {
          console.log("Download talent with ID: ");
        },
      });
    } catch (error) {
      console.error("Error from handleDownload: ", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-[40%]">
          <CardTitle className="font-semibold">Client List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total{" "}
            {data?.meta?.count ?? 0} Client
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <InputSearch
              onSearch={handleSearch}
              placeholder="Search client here..."
              defaultValue={queryParams.src}
            />
          </div>
          <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={handleDownload}
          >
            <Download size={16} />
            Download
          </Button>
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

      <DetailClientBilling />
      <ModalDetailBilling />
    </Card>
  );
}
