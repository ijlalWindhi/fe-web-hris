import React from "react";
import { Download } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { ILeaveSubmissionTalentMonitoring } from "@/types";

const TableHeader: ITableHeader[] = [
  {
    key: "leave_type",
    title: "Leave Type",
    className: "min-w-[8rem]",
  },
  {
    key: "date_period",
    title: "Date Period",
    className: "min-w-[11rem]",
  },
  {
    key: "notes",
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

export default function AttendanceLeave() {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <h2 className="md:text-lg font-semibold">Leave Submission</h2>
          <Badge variant={"outline"}>
            <span className="text-primary mr-1">•</span> Total 1 pending leave
            request
          </Badge>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <Table<ILeaveSubmissionTalentMonitoring>
        header={TableHeader}
        data={[
          {
            id: "1",
            leave_type: "Annual Leave",
            date_period: "15 March 2021 - 20 March 2021",
            total_days: 6,
            notes: "Family vacation",
            evidence: null,
            status: "Waiting for Approval",
          },
          {
            id: "2",
            leave_type: "Sick Leave",
            date_period: "15 March 2021",
            total_days: 1,
            notes: "Sick",
            evidence: "surat_dokter.pdf",
            status: "Approved",
          },
        ]}
        loading={false}
      >
        <TableCell<ILeaveSubmissionTalentMonitoring> name="date_period">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <Badge variant={"outline"} className="bg-white hover:bg-white">
                {row.total_days} days
              </Badge>
              <span>{row.date_period}</span>
            </div>
          )}
        </TableCell>
        <TableCell<ILeaveSubmissionTalentMonitoring> name="evidence">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <span>{row.evidence ?? "-"}</span>
              {row.evidence && <Download size={16} className="text-primary" />}
            </div>
          )}
        </TableCell>
        <TableCell<ILeaveSubmissionTalentMonitoring> name="status">
          {({ row }) => (
            <Badge variant={row.status === "Approved" ? "success" : "gray"}>
              {row.status}
            </Badge>
          )}
        </TableCell>
      </Table>
    </div>
  );
}
