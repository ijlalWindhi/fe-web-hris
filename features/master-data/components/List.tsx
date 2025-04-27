"use client";
import React from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { format, parse } from "date-fns";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IResponseListMasterHoliday, TSearchParams } from "@/types";
import useMasterHoliday from "@/stores/master-data";
import useTheme from "@/stores/theme";
import {
  useDeleteMasterHoliday,
  useMasterHolidayList,
} from "../hooks/useMasterData";
import { hasPermission } from "@/utils/get-permission";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "date",
    title: "Date",
    className: "min-w-[8rem]",
  },
  {
    key: "month",
    title: "Month",
    className: "min-w-[8rem]",
  },
  {
    key: "note",
    title: "Notes",
    className: "min-w-[14rem]",
  },
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const { setSelectedData, toggleModalMasterHoliday } = useMasterHoliday();
  const { data, isLoading } = useMasterHolidayList(queryParams);
  const deleteHoliday = useDeleteMasterHoliday();

  // functions
  const handleDelete = (id: number) => {
    try {
      setModalDelete({
        open: true,
        type: "holiday calendar",
        action: async () => {
          const res = await deleteHoliday.mutateAsync(id);
          if (res.status === "success") {
            setModalSuccess({
              open: true,
              title: "Holiday Calendar Successfully Deleted",
              message:
                "The holiday calendar information has been deleted successfully.",
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
    <Table<IResponseListMasterHoliday>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseListMasterHoliday> name="date">
        {({ row }) => (
          <div className="flex gap-1">
            {format(
              parse(row?.date, "yyyy-MM-dd", new Date()),
              "MMMM dd, yyyy",
            )}
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListMasterHoliday> name="month">
        {({ row }) => (
          <div className="flex gap-1">
            {format(parse(row?.date, "yyyy-MM-dd", new Date()), "MMMM")}
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListMasterHoliday> name="action">
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
                {hasPermission("Holiday", "edit") && (
                  <DropdownMenuItem
                    onClick={() => {
                      setTimeout(() => {
                        setSelectedData(row);
                        toggleModalMasterHoliday(true);
                      }, 100);
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                    Edit
                  </DropdownMenuItem>
                )}
                {hasPermission("Holiday", "delete") && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setTimeout(() => {
                        handleDelete(row.id);
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
