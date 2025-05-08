"use client";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";

import { IResponseLogSistem, TSearchParams } from "@/types";
import { useLogSystemList } from "../hooks/useLogSystem";
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
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { data, isLoading } = useLogSystemList(queryParams);

  // functions
  const formatDate = (date: string) => {
    return date
      ? format(new Date(date), "dd MMMM yyyy HH:mm:ss", { locale: id })
      : "";
  };

  return (
    <Table<IResponseLogSistem>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseLogSistem> name="created_at">
        {({ row }) => <span>{formatDate(row?.created_at)}</span>}
      </TableCell>
      <TableCell<IResponseLogSistem> name="updated_at">
        {({ row }) => (
          <span>{row?.updated_at ? formatDate(row?.updated_at) : "-"}</span>
        )}
      </TableCell>
      <TableCell<IResponseLogSistem> name="isact">
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
    </Table>
  );
}
