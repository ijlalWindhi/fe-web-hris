import React from "react";
import { EllipsisVertical, Download, Info, Pencil, Trash } from "lucide-react";

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

import { IResponseList } from "@/types";
import useTheme from "@/stores/theme";
import useTalentMapping from "@/stores/talent-mapping";

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Talent ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Name",
    className: "min-w-[10rem]",
  },
  {
    key: "date_of_birth",
    title: "Date of Birth",
    className: "min-w-[14rem]",
  },
  {
    key: "id_number",
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

export default function List() {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const {
    setSelectedId,
    toggleModalTalentMapping,
    toggleModalDetailTalentMapping,
  } = useTalentMapping();

  // functions
  const handleDelete = (id: number) => {
    try {
      setModalDelete({
        open: true,
        type: "talent",
        action: () => {
          console.log("Delete talent with ID: ", id);
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  const handleDownload = (id: number) => {
    try {
      setModalSuccess({
        open: true,
        title: "Download Successful!",
        message:
          "The talent data has been downloaded successfully. You can now review it on your device.",
        actionMessage: "Close",
        actionVariant: "outline",
        animation: "success",
        action: () => {
          console.log("Download talent with ID: ", id);
        },
      });
    } catch (error) {
      console.error("Error from handleDownload: ", error);
    }
  };

  return (
    <Table<IResponseList>
      header={TableHeader}
      data={[
        {
          id: 1,
          name: "John Doe",
          date_of_birth: "1990-01-01",
          id_number: "1234567890",
          email: "asd@mail.com",
          phone: "081234567890",
          address: "Jl. Lorem Ipsum Dolor Sit Amet",
        },
      ]}
      loading={false}
    >
      <TableCell<IResponseList> name="name">
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
      <TableCell<IResponseList> name="action">
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
                      toggleModalDetailTalentMapping(true);
                    }, 100);
                  }}
                >
                  <Info className="h-5 w-5" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedId(row.id);
                    toggleModalTalentMapping(true);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(row.id)}>
                  <Trash className="h-5 w-5" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload(row.id)}>
                  <Download className="h-5 w-5" />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
