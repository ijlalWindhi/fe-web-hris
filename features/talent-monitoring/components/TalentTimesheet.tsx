import React from "react";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { ITimesheetHistoryTalentMonitoring } from "@/types";
import { useTimesheet } from "../hooks/useTalentMonitoring";

const TableHeader: ITableHeader[] = [
  {
    key: "date",
    title: "Date",
    className: "min-w-[14rem]",
  },
  {
    key: "working_hours",
    title: "Working Hours",
    className: "min-w-[8rem]",
  },
  {
    key: "notes",
    title: "Notes",
    className: "min-w-[11rem]",
  },
];

interface ITalentTimesheetProps {
  talentId: string;
}

export default function TalentTimesheet({ talentId }: ITalentTimesheetProps) {
  // variables
  const { data } = useTimesheet(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex gap-2 items-center">
          <h2 className="md:text-lg font-semibold">Timesheet History</h2>
          <Badge variant={"outline"}>
            <span className="text-primary mr-1">•</span> Total{" "}
            {data?.data?.total_workdays ?? 0} Working Days
          </Badge>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <Table<ITimesheetHistoryTalentMonitoring>
        header={TableHeader}
        data={data?.data?.timesheet ?? []}
        loading={false}
      ></Table>
    </div>
  );
}
