import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { InputField } from "@/components/common/input-field";

import { IAttendanceHistoryTalentMonitoring, IParamsSearch } from "@/types";
import { useAttendance } from "../hooks/useTalentMonitoring";
import { SearchSchema } from "../schemas/talent-monitoring.schema";

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
  form: UseFormReturn<z.infer<typeof SearchSchema>>;
  params: IParamsSearch;
  sharedDateRange: { start?: Date; end?: Date };
  onDateRangeChange: (value: { start?: Date; end?: Date }) => void;
}

export default function AttendanceHistory({
  form,
  params,
  sharedDateRange,
  onDateRangeChange,
}: IAttendanceHistoryProps) {
  // variables
  const { data } = useAttendance(params);

  // functions
  const handleDateChange = (value: { start?: Date; end?: Date }) => {
    onDateRangeChange(value);
  };

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
        <InputField
          name="search"
          control={form.control}
          render={({ field }) => (
            <DatePickerWithRange
              name="search"
              control={form.control}
              value={sharedDateRange}
              onChange={handleDateChange}
              placeholder="Select date range"
            />
          )}
        />
      </div>
      <Table<IAttendanceHistoryTalentMonitoring>
        header={TableHeader}
        data={data?.data?.attendance ?? []}
        loading={false}
      />
    </div>
  );
}
