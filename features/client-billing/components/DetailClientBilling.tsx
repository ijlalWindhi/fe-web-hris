import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Download, BadgeCheck } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { type ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";

import type { IListDetailClientBilling } from "@/types";
import useClientBilling from "@/stores/client-billing";

const TableHeader: ITableHeader[] = [
  {
    key: "month",
    title: "Month",
    className: "min-w-[10rem]",
  },
  {
    key: "talent_resource",
    title: "Talent Resource",
    className: "min-w-[10rem]",
  },
  {
    key: "billing",
    title: "Billing",
    className: "min-w-[10rem]",
  },
  {
    key: "status",
    title: "Current Status",
    className: "min-w-[10rem]",
  },
  {
    key: "payment",
    title: "Payment",
    className: "min-w-[10rem]",
  },
];

export default function DetailClientBilling() {
  // variables
  const {
    modalDetailClientBilling,
    selectedId,
    detailType,
    toggleModalDetailClientBilling,
  } = useClientBilling();
  const [header, setHeader] = useState<ITableHeader[]>(TableHeader);

  // lifecycle
  useEffect(() => {
    if (detailType === "edit") {
      setHeader([
        ...TableHeader,
        {
          key: "action",
          title: "Action",
          className: "min-w-[10rem]",
        },
      ]);
    } else {
      setHeader(TableHeader);
    }
  }, [detailType]);

  return (
    <Sheet
      open={modalDetailClientBilling}
      onOpenChange={() => toggleModalDetailClientBilling(false)}
    >
      <SheetContent className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{selectedId ? "View" : "Edit"} Client Billing</SheetTitle>
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
        <h3 className="text-sm font-medium">Client Billing</h3>
        <Table<IListDetailClientBilling>
          header={header}
          data={[
            {
              month: "January 2022",
              talent_resource: 100,
              billing: "Rp 1.000.000",
              status: "Pending",
              payment: "payment.png",
            },
          ]}
          loading={false}
        >
          <TableCell<IListDetailClientBilling> name="status">
            {({ row }) => (
              <Badge variant={row.status === "Pending" ? "pending" : "success"}>
                • {row.status}
              </Badge>
            )}
          </TableCell>
          <TableCell<IListDetailClientBilling> name="payment">
            {({ row }) => (
              <div className="flex items-center gap-1 cursor-pointer">
                {row.payment}{" "}
                <Download size={16} className="text-primary ml-2" />
              </div>
            )}
          </TableCell>
          {selectedId && (
            <TableCell<IListDetailClientBilling> name="action">
              {({ row }) => (
                <div className="flex items-center gap-2 cursor-pointer">
                  <BadgeCheck size={16} className="text-green-500" />
                  Verify
                </div>
              )}
            </TableCell>
          )}
        </Table>
      </SheetContent>
    </Sheet>
  );
}
