"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Download, Plus } from "lucide-react";

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
const ModalDownloadReport = dynamic(() => import("./ModalDownloadReport"));
const ModalMasterClient = dynamic(() => import("./ModalMasterClient"));
const DetailMasterClient = dynamic(() => import("./DetailMasterClient"));

import useTheme from "@/stores/theme";
import useMasterClient from "@/stores/master-client";

export default function MasterClient() {
  // variables
  const { setModalSuccess } = useTheme();
  const { toggleModalDownloadReport } = useMasterClient();

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
          <CardTitle className="font-semibold">Client List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total 100 Client
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <InputSearch
              onSearch={handleSearch}
              placeholder="Search client here..."
              defaultValue={""}
            />
          </div>
          <Button
            variant={"default-outline"}
            size="sm"
            className="w-full md:w-auto"
            onClick={() => toggleModalDownloadReport(true)}
          >
            <Download size={16} />
            Download Report
          </Button>
          <Button
            size="sm"
            className="w-full md:w-auto"
            // onClick={handleDownload}
          >
            <Plus size={16} />
            Register Client
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <List />
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
      <ModalDownloadReport />
      <ModalMasterClient />
      <DetailMasterClient />
    </Card>
  );
}
