import React from "react";
import { EllipsisVertical, Info, Pencil } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table } from "@/components/common/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { IResponseListClientBilling, TSearchParams } from "@/types";
import useClientBilling from "@/stores/client-billing";
import { useClientBillingList } from "../hooks/useClientBilling";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Client ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Client Name",
    className: "min-w-[14rem]",
  },
  {
    key: "address",
    title: "Client Address",
    className: "min-w-[14rem]",
  },
  {
    key: "status",
    title: "Current Status",
    className: "min-w-[8rem]",
  },
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setSelectedData, toggleModalDetailClientBilling, setDetailType } =
    useClientBilling();
  const { data, isLoading } = useClientBillingList(queryParams);

  return (
    <Table<IResponseListClientBilling>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseListClientBilling> name="name">
        {({ row }) => (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={row?.photo || "/images/unavailable-profile.webp"}
                alt="avatar"
                className="object-cover w-full h-full"
              />
              <AvatarFallback>
                {row?.name?.charAt(0)?.toUpperCase() || "-"}
              </AvatarFallback>
            </Avatar>
            <span>{row.name}</span>
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListClientBilling> name="status">
        {({ row }) => (
          <Badge variant={row.payment_status ? "success" : "pending"}>
            • {row.payment_status ? "Complete" : "Pending"}
          </Badge>
        )}
      </TableCell>
      <TableCell<IResponseListClientBilling> name="action">
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
                      setSelectedData(row);
                      setDetailType("detail");
                      toggleModalDetailClientBilling(true);
                    }, 100);
                  }}
                >
                  <Info className="h-5 w-5" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      setSelectedData(row);
                      setDetailType("edit");
                      toggleModalDetailClientBilling(true);
                    }, 100);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
