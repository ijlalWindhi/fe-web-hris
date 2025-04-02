import React from "react";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { IAttendanceHistoryTalentMonitoring } from "@/types";
import { useAttendance } from "../hooks/useTalentMonitoring";

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

interface IAttendanceHistoryProps {
  talentId: string;
}

export default function AttendanceHistory({
  talentId,
}: IAttendanceHistoryProps) {
  // variables
  const { data } = useAttendance(talentId);
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <h2 className="md:text-lg font-semibold">Attendance History</h2>
          <Badge variant={"outline"}>
            <span className="text-primary mr-1">•</span> Total{" "}
            {data?.data?.attendance?.[0]?.total_workdays ?? 0} Working Days
          </Badge>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <Table<IAttendanceHistoryTalentMonitoring>
        header={TableHeader}
        data={data?.data?.attendance ?? []}
        loading={false}
      />
    </div>
  );
}
