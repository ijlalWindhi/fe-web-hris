import React from "react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { type ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataRow from "@/components/common/data-row";

import useMasterClient from "@/stores/master-client";
import type { IListOutlet } from "@/types";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Outlet ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Outlet Name",
    className: "min-w-[10rem]",
  },
  {
    key: "address",
    title: "Outlet Address",
    className: "min-w-[16rem]",
  },
];

export default function DetailMasterClient() {
  // variables
  const { modalDetailMasterClient, toggleModalDetailMasterClient } =
    useMasterClient();

  return (
    <Sheet
      open={modalDetailMasterClient}
      onOpenChange={() => toggleModalDetailMasterClient(false)}
    >
      <SheetContent className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>View Master Client</SheetTitle>
        </SheetHeader>
        <div className="flex items-center gap-2 bg-blue-50 p-2 md:p-3 rounded-lg my-4">
          <Image
            src={"/images/unavailable-profile.webp"}
            alt="logo client"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="space-y-1.5">
            <div className="flex items-center">
              <h2 className="font-semibold text-sm">PT. Testing Jaya</h2>
              <Badge variant="outline" className="ml-2 bg-white w-fit">
                <span className="text-primary">•</span> 001
              </Badge>
            </div>
            <p className="text-xs">
              Jl. Lorem Ipsum Dolor Sit Amet, No. 123, Jakarta Selatan
            </p>
          </div>
        </div>

        <Tabs defaultValue="outlet_list" className="min-w-full mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="outlet_list">Outlet List</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
          </TabsList>
          <TabsContent value="outlet_list">
            <Table<IListOutlet>
              header={TableHeader}
              data={[
                {
                  id: 1,
                  name: "Talent Resource 1",
                  address:
                    "Jl. Lorem Ipsum Dolor Sit Amet, No. 123, Jakarta Selatan",
                },
                {
                  id: 2,
                  name: "Talent Resource 2",
                  address:
                    "Jl. Lorem Ipsum Dolor Sit Amet, No. 123, Jakarta Selatan",
                },
              ]}
              loading={false}
            ></Table>
          </TabsContent>
          <TabsContent value="payroll">
            <dl className="divide-y">
              <DataRow label="Basic Salary" value={"-"} />
              <DataRow label="Agency Fee" value={"-"} />
              <DataRow label="Allowance" value={"-"} />
              <DataRow label="Total Deduction" value={"-"} />
              <DataRow label="Nett Payment" value={"-"} bold />
              <DataRow label="Payment Due Date" value={"-"} />
            </dl>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
