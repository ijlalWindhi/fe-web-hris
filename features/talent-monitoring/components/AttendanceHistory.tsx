import React from "react";
import Image from "next/image";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { IAttendanceHistoryTalentMonitoring } from "@/types";

const TableHeader: ITableHeader[] = [
  {
    key: "date",
    title: "Date",
    className: "min-w-[11rem]",
  },
  {
    key: "location",
    title: "Location",
    className: "min-w-[11rem]",
  },
  {
    key: "clock_in",
    title: "Clock In",
    className: "min-w-[11rem]",
  },
  {
    key: "clock_out",
    title: "Clock Out",
    className: "min-w-[11rem]",
  },
];

export default function AttendanceHistory() {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <h2 className="md:text-lg font-semibold">Attendance History</h2>
          <Badge variant={"outline"}>
            <span className="text-primary mr-1">•</span> Total 22 Working Days
          </Badge>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <Table<IAttendanceHistoryTalentMonitoring>
        header={TableHeader}
        data={[
          {
            id: "1",
            date: "Wednesday, 1 January 2021",
            location: "Office",
            clock_in: "08:00",
            clock_out: "17:00",
          },
        ]}
        loading={false}
      >
        <TableCell<IAttendanceHistoryTalentMonitoring> name="clock_in">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <span>{row.clock_in}</span>
              <div className="relative h-6 w-6 rounded-full overflow-hidden">
                <Image
                  src={"/images/unavailable-profile.webp"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          )}
        </TableCell>
        <TableCell<IAttendanceHistoryTalentMonitoring> name="clock_out">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <span>{row.clock_out}</span>
              <div className="relative h-6 w-6 rounded-full overflow-hidden">
                <Image
                  src={"/images/unavailable-profile.webp"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          )}
        </TableCell>
      </Table>
    </div>
  );
}
