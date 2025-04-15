import React from "react";
import { Info, Download } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";

import { IResponseListHistoryPayment, TSearchParams } from "@/types";
import useHistoryPayment from "@/stores/history-payment";
import { useHistoryPaymentList } from "../hooks/useHistoryPayment";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Inv ID",
  },
  {
    key: "date",
    title: "Invoice Date",
  },
  {
    key: "amount",
    title: "Amount Billed",
  },
  {
    key: "total_talent",
    title: "TAD Resource",
  },
  {
    key: "status",
    title: "Current Status",
  },
  {
    key: "evidence_payment",
    title: "Payment",
  },
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setSelectedData, toggleModalDetailHistoryPayment } =
    useHistoryPayment();
  const { data, isLoading } = useHistoryPaymentList(queryParams);

  // functions
  const formatRupiah = (angka: number) => {
    if (angka === null || angka === undefined) return "";

    const stringAngka = angka?.toString();
    const split = stringAngka?.split(".");
    const depan = split?.[0];
    let belakang = split?.length > 1 ? split[1] : "";

    if (belakang?.length > 2) {
      belakang = belakang?.substring(0, 2);
    } else if (belakang?.length === 1) {
      belakang = belakang + "0";
    } else if (belakang?.length === 0 && split?.length > 1) {
      belakang = "00";
    }

    const reverseDepan = depan?.toString()?.split("")?.reverse()?.join("");
    const ribuan = reverseDepan?.match(/\d{1,3}/g);
    const hasilRibuan = ribuan?.join(".")?.split("")?.reverse()?.join("");

    return belakang ? `${hasilRibuan},${belakang}` : hasilRibuan;
  };

  return (
    <Table<IResponseListHistoryPayment>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseListHistoryPayment> name="status">
        {({ row }) => (
          <Badge variant={row.status.id === 1 ? "success" : "pending"}>
            • {row.status.id === 1 ? "Complete" : "Pending"}
          </Badge>
        )}
      </TableCell>
      <TableCell<IResponseListHistoryPayment> name="amount">
        {({ row }) => (
          <span className="text-sm">Rp{formatRupiah(row.amount)}</span>
        )}
      </TableCell>
      <TableCell<IResponseListHistoryPayment> name="evidence_payment">
        {({ row }) =>
          row.evidence_payment ? (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => {
                window.open(row.evidence_payment, "_blank");
              }}
            >
              {row.evidence_payment}{" "}
              <Download size={16} className="text-primary ml-2" />
            </div>
          ) : (
            "-"
          )
        }
      </TableCell>
      <TableCell<IResponseListHistoryPayment> name="action">
        {({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedData(row);
                toggleModalDetailHistoryPayment(true);
              }}
            >
              <Info size={16} />
            </Button>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
