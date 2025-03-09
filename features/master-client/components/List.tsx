"use client";
import React from "react";
import { EllipsisVertical, Info, Pencil, Trash } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { IResponseListMasterClient } from "@/types";
import useMasterClient from "@/stores/master-client";
import useTheme from "@/stores/theme";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Client ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Client Name",
    className: "min-w-[8rem]",
  },
  {
    key: "address",
    title: "Client Address",
    className: "min-w-[8rem]",
  },
  {
    key: "outlet",
    title: "Outlet",
    className: "min-w-[14rem]",
  },
  { key: "action", title: "Action" },
];

export default function List() {
  // variables
  const { setModalDelete } = useTheme();
  const {
    setSelectedId,
    toggleModalDetailMasterClient,
    toggleModalMasterClient,
  } = useMasterClient();

  // functions
  const handleDelete = (id: number) => {
    try {
      setModalDelete({
        open: true,
        type: "client",
        action: () => {
          console.log("Delete talent with ID: ", id);
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <Table<IResponseListMasterClient>
      header={TableHeader}
      data={[
        {
          id: 1,
          name: "John Doe",
          address: "Jl. Lorem Ipsum Dolor Sit Amet",
          outlet: ["Outlet 1", "Outlet 2"],
        },
      ]}
      loading={false}
    >
      <TableCell<IResponseListMasterClient> name="outlet">
        {({ row }) => (
          <div className="flex gap-1 flex-wrap">
            {row.outlet.map((outlet, index) => (
              <Badge key={index} variant={"outline"} className="w-fit bg-white">
                <span className="text-primary">•</span> {outlet}
              </Badge>
            ))}
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListMasterClient> name="action">
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
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      setSelectedId(row.id);
                      toggleModalDetailMasterClient(true);
                    }, 100);
                  }}
                >
                  <Info className="h-5 w-5" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      setSelectedId(row.id);
                      toggleModalMasterClient(true);
                    }, 100);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      handleDelete(row.id);
                    }, 100);
                  }}
                >
                  <Trash className="h-5 w-5" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
