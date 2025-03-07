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

import { IResponseListUserManagement } from "@/types";
import useTheme from "@/stores/theme";
import useUserManagement from "@/stores/user-management";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "User ID",
    className: "min-w-[6rem]",
  },
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

export default function List() {
  // variables
  const { setModalDelete } = useTheme();
  const { setSelectedId, toggleModalUserManagement } = useUserManagement();

  // functions
  const handleDelete = (id: number) => {
    try {
      setModalDelete({
        open: true,
        type: "user",
        action: () => {
          console.log("Delete talent with ID: ", id);
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <Table<IResponseListUserManagement>
      header={TableHeader}
      data={[
        {
          id: 1,
          name: "John Doe",
          email: "asd@mail.com",
          phone: "081234567890",
          address: "Jl. Lorem Ipsum Dolor Sit Amet",
          client_name: "CV. Sinergi Baru",
          role: "Super Admin",
          status: "Active",
        },
      ]}
      loading={false}
    >
      <TableCell<IResponseListUserManagement> name="name">
        {({ row }) => (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={"/images/unavailable-profile.webp"}
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
      <TableCell<IResponseListUserManagement> name="role">
        {({ row }) => (
          <Badge variant="outline" className="ml-2 bg-white w-fit">
            <span className="text-primary">•</span> {row.role}
          </Badge>
        )}
      </TableCell>
      <TableCell<IResponseListUserManagement> name="status">
        {({ row }) => (
          <div className="flex items-center gap-2">
            <Switch checked={row.status === "Active"} />
            <span>{row.status}</span>
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListUserManagement> name="action">
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
