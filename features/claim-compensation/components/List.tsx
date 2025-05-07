"use client";
import React from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IResponseClaimCompensation, TSearchParams } from "@/types";
import useClaimCompensation from "@/stores/claim-compensation";
import useTheme from "@/stores/theme";
import {
  useDeleteClaimCompensation,
  useClaimCompensationList,
} from "../hooks/useClaimCompensation";
import { hasPermission } from "@/utils/get-permission";
import { Badge } from "@/components/ui/badge";

const TableHeader: ITableHeader[] = [
  {
    key: "talent_name",
    title: "Nama TAD",
  },
  {
    key: "client_name",
    title: "Nama Klien",
    className: "min-w-[8rem]",
  },
  {
    key: "service_name",
    title: "Nama Layanan",
    className: "min-w-[8rem]",
  },
  {
    key: "amount",
    title: "Nominal",
    className: "min-w-[8rem]",
  },
  {
    key: "payment_date",
    title: "Tanggal Pembayaran",
    className: "min-w-[8rem]",
  },
  {
    key: "type",
    title: "Tipe",
    className: "min-w-[8rem]",
  },
  {
    key: "description",
    title: "Deskripsi",
    className: "min-w-[14rem]",
  },
  { key: "action", title: "Aksi" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const { setSelectedData, toggleModalClaimCompensation } =
    useClaimCompensation();
  const { data, isLoading } = useClaimCompensationList(queryParams);
  const deleteHoliday = useDeleteClaimCompensation();

  // functions
  const handleDelete = (id: number) => {
    try {
      setModalDelete({
        open: true,
        type: "payment",
        action: async () => {
          const res = await deleteHoliday.mutateAsync(id);
          if (res.status === "success") {
            setModalSuccess({
              open: true,
              title: "Klaim & Kompensasi Berhasil Dihapus",
              message: "Informasi pembayaran telah berhasil dihapus.",
              actionVariant: "default",
              actionMessage: "Back",
              action: () => {},
              animation: "success",
            });
          }
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <Table<IResponseClaimCompensation>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseClaimCompensation> name="talent_name">
        {({ row }) => (
          <div className="flex items-center gap-1">
            <span>
              {row?.employee?.map((emp) => emp.name).join(", ") || "-"}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell<IResponseClaimCompensation> name="type">
        {({ row }) => (
          <Badge
            variant={
              row?.type?.id === 1
                ? "blue"
                : row?.type?.id === 2
                  ? "success"
                  : row?.type?.id === 3
                    ? "gray"
                    : row?.type?.id === 4
                      ? "pending"
                      : "gray"
            }
          >
            <span className="mr-1">•</span>
            {row?.type?.name || "-"}
          </Badge>
        )}
      </TableCell>
      <TableCell<IResponseClaimCompensation> name="amount">
        {({ row }) => (
          <span>
            {row?.amount
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(row?.amount || 0)
              : "-"}
          </span>
        )}
      </TableCell>
      <TableCell<IResponseClaimCompensation> name="action">
        {({ row }) => (
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hasPermission("Claim & Compensation", "edit") && (
                  <DropdownMenuItem
                    onClick={() => {
                      setTimeout(() => {
                        setSelectedData(row);
                        toggleModalClaimCompensation(true);
                      }, 100);
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                    Ubah
                  </DropdownMenuItem>
                )}
                {hasPermission("Claim & Compensation", "delete") && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setTimeout(() => {
                        handleDelete(row.id);
                      }, 100);
                    }}
                  >
                    <Trash className="h-5 w-5" />
                    Hapus
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
