import React from "react";
import { useRouter } from "next/navigation";
import { EllipsisVertical, Info, MapPin } from "lucide-react";

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

import { IResponseListTalentMonitoring, TSearchParams } from "@/types";
import { useTalentMonitoringList } from "../hooks/useTalentMonitoring";

const TableHeader: ITableHeader[] = [
  {
    key: "talend_id",
    title: "ID TAD",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Nama",
    className: "min-w-[12rem]",
  },
  {
    key: "phone",
    title: "No. Telepon",
    className: "min-w-[10rem]",
  },
  {
    key: "penempatan_client",
    title: "Penempatan Klien",
    className: "min-w-[10rem]",
  },
  {
    key: "penempatan_outlet",
    title: "Penempatan Outlet",
    className: "min-w-[11rem]",
  },
  {
    key: "distance",
    title: "Jarak Ke Outlet",
    className: "min-w-[10rem]",
  },
  {
    key: "shift",
    title: "Jadwal Shift",
    className: "min-w-[8rem]",
  },
  {
    key: "total_jam_kerja",
    title: "Total Jam Kerja",
    className: "min-w-[10rem]",
  },
  { key: "action", title: "Aksi" },
];

interface IListProps {
  queryParams: TSearchParams;
}

export default function List({ queryParams }: Readonly<IListProps>) {
  // variables
  const router = useRouter();
  const { data, isLoading } = useTalentMonitoringList(queryParams);

  return (
    <Table<IResponseListTalentMonitoring>
      header={TableHeader}
      data={data?.data || []}
      loading={isLoading}
    >
      <TableCell<IResponseListTalentMonitoring> name="name">
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
      <TableCell<IResponseListTalentMonitoring> name="shift">
        {({ row }) => (
          <div className="flex items-center gap-1">
            {row.jam_masuk} - {row.jam_keluar}
          </div>
        )}
      </TableCell>
      <TableCell<IResponseListTalentMonitoring> name="distance">
        {({ row }) => <p>{row.distance ? row.distance + "m" : "-"}</p>}
      </TableCell>
      <TableCell<IResponseListTalentMonitoring> name="action">
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
                    router.push(`/talent-monitoring/${row.talend_id}`);
                  }}
                >
                  <Info className="h-5 w-5" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const { lat, long } = row;
                    if (lat && long) {
                      window.open(
                        `https://www.google.com/maps?q=${lat},${long}`,
                        "_blank",
                      );
                    } else {
                      alert("Lokasi tidak tersedia");
                    }
                  }}
                >
                  <MapPin className="h-5 w-5" />
                  Lokasi Clock-In
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </Table>
  );
}
