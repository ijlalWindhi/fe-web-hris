"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataRow from "@/components/common/data-row";
import { InputField } from "@/components/common/input-field";
import { FileUpload } from "@/components/common/input-file";

import useMasterClient from "@/stores/master-client";
import type { IListOutlet } from "@/types";
import { UploadSignatureSchema } from "../schemas/master-client.schema";
import { useDetailInformationMasterClient } from "../hooks/useMasterClient";

const TableHeader: ITableHeader[] = [
  {
    key: "id_outlet",
    title: "Outlet ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Outlet Name",
    className: "min-w-[10rem]",
  },
  {
    key: "total_active",
    title: "Total Active",
    className: "min-w-[10rem]",
  },
  {
    key: "address",
    title: "Address",
    className: "min-w-[20rem]",
  },
];

export default function DetailMasterClient() {
  // variables
  const {
    modalDetailMasterClient,
    selectedData,
    toggleModalDetailMasterClient,
  } = useMasterClient();
  const { data, refetch } = useDetailInformationMasterClient(
    selectedData?.id ?? "",
  );
  const form = useForm<z.infer<typeof UploadSignatureSchema>>({
    resolver: zodResolver(UploadSignatureSchema),
    defaultValues: {
      manager: null,
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof UploadSignatureSchema>) => {
    console.log(values);
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.id) {
      refetch();
    }
  }, [selectedData, refetch]);

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
            src={data?.data?.photo || "/images/unavailable-profile.webp"}
            alt="logo client"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="space-y-1.5">
            <div className="flex items-center">
              <h2 className="font-semibold text-sm">
                {data?.data?.name ?? "-"}
              </h2>
              <Badge variant="outline" className="ml-2 bg-white w-fit">
                <span className="text-primary">•</span>{" "}
                {data?.data?.id_client ?? "-"}
              </Badge>
            </div>
            <p className="text-xs">{data?.data?.address ?? "-"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <DataRow label="CS Name" value={data?.data?.cs_person ?? "-"} />
          <DataRow label="CS Email" value={data?.data?.cs_email ?? "-"} />
          <DataRow
            label="CS Phone Number"
            value={data?.data?.cs_number ?? "-"}
          />
        </div>

        <Tabs defaultValue="outlet_list" className="min-w-full mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="outlet_list">Outlet List</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
          </TabsList>
          <TabsContent value="outlet_list">
            <Table<IListOutlet>
              header={TableHeader}
              data={data?.data?.outlet ?? []}
              loading={false}
            >
              <TableCell<IListOutlet> name="total_active">
                {({ row }) => <span>{row.total_active} Active</span>}
              </TableCell>
            </Table>
            <div className="rounded-full w-full text-sm p-3 bg-gray-50 border text-gray-500 my-4">
              Total active TAD{" "}
              <span className="font-semibold !text-black">
                {data?.data?.total_active}
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <InputField
                  name="manager"
                  label="Upload Digital Signature as Manager"
                  control={form.control}
                  render={({ field }) => (
                    <FileUpload
                      {...field}
                      maxSize={5}
                      supportedFormats={["image/jpeg", "image/png"]}
                    />
                  )}
                />
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="payroll">
            <dl className="divide-y">
              <DataRow
                label="Basic Salary"
                value={data?.data?.payroll?.basic_salary ?? "-"}
              />
              <DataRow
                label="Agency Fee%"
                value={data?.data?.payroll?.agency_fee ?? "-"}
              />
              <DataRow
                label="Allowance"
                value={data?.data?.payroll?.allowance ?? "-"}
              />
              <DataRow
                label="Total Deduction"
                value={data?.data?.payroll?.total_deduction ?? "-"}
              />
              <DataRow
                label="Nett Payment"
                value={data?.data?.payroll?.nett_payment ?? "-"}
                bold
              />
              <DataRow
                label="Payment Due Date"
                value={data?.data?.payroll?.due_date ?? "-"}
              />
            </dl>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
