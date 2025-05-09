"use client";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Info } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";

import { IResponseLogSystem, TSearchParams } from "@/types";
import { useLogSystemList } from "../hooks/useLogSystem";
import useLogSystem from "@/stores/log-system";
import { cn } from "@/utils/utils";

const TableHeader: ITableHeader[] = [
  {
    key: "username",
    title: "Nama Pengguna",
  },
  {
    key: "module",
    title: "Modul",
  },
  {
    key: "action",
    title: "Aksi",
  },
  {
    key: "target",
    title: "Target",
  },
  {
    key: "created_at",
    title: "Waktu Dibuat",
  },
  {
    key: "updated_at",
    title: "Waktu Diperbarui",
  },
  { key: "isact", title: "Status" },
  { key: "detail", title: "Detail" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { data, isLoading } = useLogSystemList(queryParams);
  const { setSelectedData, toggleModalLogSystem } = useLogSystem();

  // functions
  const formatDate = (date: string) => {
    return date
      ? format(new Date(date), "dd MMMM yyyy HH:mm:ss", { locale: id })
      : "";
  };

  const handleDetail = (row: IResponseLogSystem) => {
    setSelectedData(row);
    toggleModalLogSystem(true);
  };

  return (
    <Table<IResponseLogSystem>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseLogSystem> name="created_at">
        {({ row }) => <span>{formatDate(row?.created_at)}</span>}
      </TableCell>
      <TableCell<IResponseLogSystem> name="updated_at">
        {({ row }) => (
          <span>{row?.updated_at ? formatDate(row?.updated_at) : "-"}</span>
        )}
      </TableCell>
      <TableCell<IResponseLogSystem> name="isact">
        {({ row }) => (
          <span
            className={cn("font-semibold", {
              "text-green-500": row?.isact,
              "text-red-500": !row?.isact,
            })}
          >
            {row?.isact ? "Aktif" : "Tidak Aktif"}
          </span>
        )}
      </TableCell>
      <TableCell<IResponseLogSystem> name="detail">
        {({ row }) => (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDetail(row)}
          >
            <Info className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </Table>
  );
}
