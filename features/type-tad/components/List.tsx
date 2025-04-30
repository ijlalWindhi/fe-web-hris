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

import { IResponseTypeTad, TSearchParams } from "@/types";
import useTypeTad from "@/stores/type-tad";
import useTheme from "@/stores/theme";
import { useDeleteTypeTad, useTypeTadList } from "../hooks/useTypeTad";
import { hasPermission } from "@/utils/get-permission";

const TableHeader: ITableHeader[] = [
  {
    key: "code",
    title: "Type ID",
  },
  {
    key: "name_client",
    title: "Client Name",
    className: "min-w-[8rem]",
  },
  {
    key: "type_tad",
    title: "Type TAD",
    className: "min-w-[8rem]",
  },
  {
    key: "type_employee",
    title: "Type Employee",
    className: "min-w-[8rem]",
  },
  {
    key: "positional_allowance",
    title: "Positional Allowance",
    className: "min-w-[8rem]",
  },
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const { setSelectedData, toggleModalTypeTad } = useTypeTad();
  const { data, isLoading } = useTypeTadList(queryParams);
  const deleteTypeTad = useDeleteTypeTad();

  // functions
  const handleDelete = (id: string) => {
    try {
      setModalDelete({
        open: true,
        type: "type TAD",
        action: async () => {
          const res = await deleteTypeTad.mutateAsync(id);
          if (res.status === "success") {
            setModalSuccess({
              open: true,
              title: "Type TAD Deleted",
              message:
                "The type TAD information has been deleted successfully.",
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
    <Table<IResponseTypeTad>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseTypeTad> name="positional_allowance">
        {({ row }) => (
          <span>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(row?.positional_allowance || 0)}
          </span>
        )}
      </TableCell>
      <TableCell<IResponseTypeTad> name="action">
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
                        toggleModalTypeTad(true);
                      }, 100);
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                    Edit
                  </DropdownMenuItem>
                )}
                {hasPermission("Claim & Compensation", "delete") && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setTimeout(() => {
                        handleDelete(row.code);
                      }, 100);
                    }}
                  >
                    <Trash className="h-5 w-5" />
                    Delete
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
