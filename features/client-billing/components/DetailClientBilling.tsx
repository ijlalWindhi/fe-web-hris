import React, { useEffect } from "react";
import Image from "next/image";
import { Download, BadgeCheck, Info } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { type ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";

import type { IResponseDetailClientBilling } from "@/types";
import useClientBilling from "@/stores/client-billing";
import useTheme from "@/stores/theme";
import {
  useDetailClientBilling,
  useVerifyBilling,
} from "../hooks/useClientBilling";
import { formatCurrency } from "@/utils/format-currency";

const TableHeader: ITableHeader[] = [
  {
    key: "date",
    title: "Invoice Date",
    className: "min-w-[10rem]",
  },
  {
    key: "amount",
    title: "Amount Billed",
    className: "min-w-[10rem]",
  },
  {
    key: "total_talent",
    title: "Talent Resource",
    className: "min-w-[10rem]",
  },
  {
    key: "status",
    title: "Current Status",
    className: "min-w-[10rem]",
  },
  {
    key: "evidence_payment",
    title: "Payment",
    className: "min-w-[10rem]",
  },
  {
    key: "action",
    title: "Action",
  },
];

export default function DetailClientBilling() {
  // variables
  const {
    modalDetailClientBilling,
    selectedData,
    detailType,
    toggleModalDetailClientBilling,
    toggleModalDetailBilling,
    setSelectedIdBilling,
  } = useClientBilling();
  const { setModalSuccess } = useTheme();
  const { data, refetch, isLoading } = useDetailClientBilling(
    selectedData?.id ?? "",
  );
  const verifyBilling = useVerifyBilling();

  // functions
  const handleOpenDetailBilling = (id: string) => {
    try {
      setSelectedIdBilling(id);
      toggleModalDetailBilling(true);
      toggleModalDetailClientBilling(false);
    } catch (error) {
      console.error("Error from handleOpenDetailBilling: ", error);
    }
  };

  const handleVerifyBilling = async (id: string) => {
    try {
      const res = await verifyBilling.mutateAsync(id);
      if (res.status === "success") {
        setModalSuccess({
          open: true,
          title: "Payment Successfully Verified",
          message:
            "The payment has been successfully verified. Please check the client billing list.",
          actionVariant: "default",
          actionMessage: "Back",
          action: () => {
            refetch();
          },
          animation: "success",
        });
      }
    } catch (error) {
      console.error("Error from handleVerifyBilling: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData) {
      refetch();
    }
  }, [selectedData, refetch]);

  return (
    <Sheet
      open={modalDetailClientBilling}
      onOpenChange={() => toggleModalDetailClientBilling(false)}
    >
      <SheetContent className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {detailType === "detail" ? "View" : "Edit"} Client Billing
          </SheetTitle>
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
              <h2 className="font-semibold text-sm">
                {selectedData?.name ?? "-"}
              </h2>
              <Badge variant="outline" className="ml-2 bg-white w-fit">
                <span className="text-primary">•</span>{" "}
                {selectedData?.id ?? "-"}
              </Badge>
            </div>
            <p className="text-xs">{selectedData?.address ?? "-"}</p>
          </div>
        </div>
        <h3 className="text-sm font-medium">Client Billing</h3>
        <Table<IResponseDetailClientBilling>
          header={TableHeader}
          data={Array.isArray(data?.data) ? data.data : []}
          loading={isLoading}
        >
          <TableCell<IResponseDetailClientBilling> name="amount">
            {({ row }) => (
              <span className="text-sm">Rp{formatCurrency(row.amount)}</span>
            )}
          </TableCell>
          <TableCell<IResponseDetailClientBilling> name="status">
            {({ row }) => (
              <Badge variant={row.status ? "success" : "pending"}>
                • {row?.status?.name ?? "-"}
              </Badge>
            )}
          </TableCell>
          <TableCell<IResponseDetailClientBilling> name="evidence_payment">
            {({ row }) =>
              row.evidence_payment ? (
                <div className="flex items-center gap-1 cursor-pointer">
                  {row.evidence_payment}{" "}
                  <Download size={16} className="text-primary ml-2" />
                </div>
              ) : (
                "-"
              )
            }
          </TableCell>
          <TableCell<IResponseDetailClientBilling> name="action">
            {({ row }) => (
              <div className="flex items-center justify-between gap-1">
                {detailType === "edit" && !row?.verify && (
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => handleVerifyBilling(row.id)}
                    loading={verifyBilling.isPending}
                  >
                    <BadgeCheck size={16} className="text-green-500" />
                    Verify
                  </Button>
                )}
                <Button
                  variant={"outline"}
                  size="icon"
                  onClick={() => handleOpenDetailBilling(row.id)}
                >
                  <Info size={16} />
                </Button>
              </div>
            )}
          </TableCell>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
