import React from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";

import { IResponseUserManagement, TSearchParams } from "@/types";
import useTheme from "@/stores/theme";
import {
  useUserList,
  useDeleteUserManagement,
} from "../hooks/useUserManagement";
import useUserManagement from "@/stores/user-management";

const TableHeader: ITableHeader[] = [
  {
    key: "name",
    title: "Name",
    className: "min-w-[10rem]",
  },
  {
    key: "email",
    title: "Email Address",
    className: "min-w-[14rem]",
  },
  {
    key: "phone",
    title: "Number Phone",
    className: "min-w-[14rem]",
  },
  {
    key: "address",
    title: "Address",
    className: "min-w-[14rem]",
  },
  {
    key: "client_name",
    title: "Client Name",
    className: "min-w-[14rem]",
  },
  {
    key: "role",
    title: "Role",
    className: "min-w-[10rem]",
  },
  {
    key: "status",
    title: "Status",
    className: "min-w-[8rem]",
  },
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  const { setModalDelete } = useTheme();
  const { setSelectedData, toggleModalUserManagement } = useUserManagement();
  const { data, isLoading } = useUserList(queryParams);
  const deleteUser = useDeleteUserManagement();

  const handleDelete = (id: string) => {
    try {
      setModalDelete({
        open: true,
        type: "user",
        action: () => {
          deleteUser.mutate(id);
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <Table<IResponseUserManagement>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseUserManagement> name="name">
        {({ row }) => (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={row.photo ?? "/images/unavailable-profile.webp"}
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
      <TableCell<IResponseUserManagement> name="client">
        {({ row }) => row.client?.name ?? "-"}
      </TableCell>
      <TableCell<IResponseUserManagement> name="role">
        {({ row }) => (
          <Badge variant="outline" className="ml-2 bg-white w-fit capitalize">
            <span className="text-primary">•</span> {row?.role?.name || "-"}
          </Badge>
        )}
      </TableCell>
      <TableCell<IResponseUserManagement> name="status">
        {({ row }) => (
          <div className="flex items-center gap-2">
            <Switch checked={row.status} />
            <span>{row.status ? "Active" : "Inactive"}</span>
          </div>
        )}
      </TableCell>
      <TableCell<IResponseUserManagement> name="action">
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
                      toggleModalUserManagement(true);
                    }, 100);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      handleDelete(row.id_user);
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
