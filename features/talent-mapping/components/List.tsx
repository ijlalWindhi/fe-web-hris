import React from "react";
import { EllipsisVertical, Info, Pencil, Trash } from "lucide-react";

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

import { IResponseListTalentMapping, TSearchParams } from "@/types";
import useTheme from "@/stores/theme";
import useTalentMapping from "@/stores/talent-mapping";
import {
  useTalentMappingList,
  useDeleteTalentMapping,
} from "../hooks/useTalentMapping";
import { hasPermission } from "@/utils/get-permission";

const TableHeader: ITableHeader[] = [
  {
    key: "talend_id",
    title: "TAD ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Name",
    className: "min-w-[10rem]",
  },
  {
    key: "dob",
    title: "Date of Birth",
    className: "min-w-[14rem]",
  },
  {
    key: "nik",
    title: "ID Number",
    className: "min-w-[14rem]",
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
  { key: "action", title: "Action" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const {
    setSelectedData,
    toggleModalTalentMapping,
    toggleModalDetailTalentMapping,
  } = useTalentMapping();
  const { data, isLoading } = useTalentMappingList(queryParams);
  const deleteTalentMapping = useDeleteTalentMapping();

  // functions
  const handleDelete = (id: string) => {
    try {
      setModalDelete({
        open: true,
        type: "TAD",
        action: async () => {
          const res = await deleteTalentMapping.mutateAsync(id);
          if (res.status === "success") {
            setModalSuccess({
              open: true,
              title: "Data Deleted Successfully!",
              message: "The TAD data has been removed from the system.",
              actionMessage: "Back",
              actionVariant: "outline",
              animation: "success",
              action: () => {},
            });
          }
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <Table<IResponseListTalentMapping>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseListTalentMapping> name="name">
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
      <TableCell<IResponseListTalentMapping> name="action">
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
                      toggleModalDetailTalentMapping(true);
                    }, 100);
                  }}
                >
                  <Info className="h-5 w-5" />
                  Detail
                </DropdownMenuItem>
                {hasPermission("Talent Mapping", "edit") && (
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedData(row);
                      toggleModalTalentMapping(true);
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                    Edit
                  </DropdownMenuItem>
                )}
                {hasPermission("Talent Mapping", "delete") && (
                  <DropdownMenuItem onClick={() => handleDelete(row.talend_id)}>
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
