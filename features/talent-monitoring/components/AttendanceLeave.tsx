import React from "react";
import { Download } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { ILeaveSubmissionTalentMonitoring } from "@/types";
import { useAttendance } from "../hooks/useTalentMonitoring";
import { truncateText } from "@/utils/truncate";

const TableHeader: ITableHeader[] = [
  {
    key: "type",
    title: "Leave Type",
    className: "min-w-[8rem]",
  },
  {
    key: "date_period",
    title: "Date Period",
    className: "min-w-[11rem]",
  },
  {
    key: "note",
    title: "Notes",
    className: "min-w-[11rem]",
  },
  {
    key: "evidence",
    title: "Evidence",
    className: "min-w-[11rem]",
  },
  {
    key: "status",
    title: "Status",
    className: "min-w-[11rem]",
  },
];

interface IAttendanceLeaveProps {
  talentId: string;
}

export default function AttendanceLeave({ talentId }: IAttendanceLeaveProps) {
  // variables
  const { data } = useAttendance(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <h2 className="md:text-lg font-semibold">Leave Submission</h2>
          <Badge variant={"outline"}>
            <span className="text-primary mr-1">•</span> Total{" "}
            {data?.data?.leave_submission?.[0]?.total_pending} pending leave
            request
          </Badge>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <Table<ILeaveSubmissionTalentMonitoring>
        header={TableHeader}
        data={data?.data?.leave_submission ?? []}
        loading={false}
      >
        <TableCell<ILeaveSubmissionTalentMonitoring> name="date_period">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <Badge
                variant={"outline"}
                className="bg-white hover:bg-white min-w-fit"
              >
                {row.date_period} days
              </Badge>
              <span>
                {row.start_date ?? "-"} - {row.end_date ?? "-"}
              </span>
            </div>
          )}
        </TableCell>
        <TableCell<ILeaveSubmissionTalentMonitoring> name="evidence">
          {({ row }) => (
            <div
              className="flex items-center gap-1 hover:underline hover:text-primary hover:cursor-pointer"
              onClick={() => {
                if (row.evidence) {
                  window.open(row.evidence, "_blank");
                }
              }}
            >
              <span>{truncateText(row.evidence, 14) || "-"}</span>
              {row.evidence && <Download size={16} className="text-primary" />}
            </div>
          )}
        </TableCell>
        <TableCell<ILeaveSubmissionTalentMonitoring> name="status">
          {({ row }) => (
            <Badge
              variant={row.status?.name === "Approved" ? "success" : "gray"}
            >
              {row.status?.name ?? "-"}
            </Badge>
          )}
        </TableCell>
      </Table>
    </div>
  );
}
