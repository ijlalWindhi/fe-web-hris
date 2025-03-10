import React from "react";
import { Star } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";

import { ITalentPerformanceTalentMonitoring } from "@/types";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";

const TableHeader: ITableHeader[] = [
  {
    key: "month",
    title: "Month",
    className: "min-w-[8rem]",
  },
  {
    key: "soft_skill",
    title: "Soft Skill",
    className: "min-w-[11rem]",
  },
  {
    key: "hard_skill",
    title: "Hard Skill",
    className: "min-w-[11rem]",
  },
  {
    key: "total_point",
    title: "Total Point",
    className: "min-w-[11rem]",
  },
  {
    key: "notes",
    title: "Notes",
    className: "min-w-[11rem]",
  },
  {
    key: "action",
    title: "Action",
  },
];

export default function TalentPerformance() {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex gap-2 items-center">
        <h2 className="md:text-lg font-semibold">Performance</h2>
        <Badge variant={"outline"}>
          <span className="text-primary mr-1">•</span> Excelent
          <Star className="ml-1 w-3 h-3 fill-current text-amber-400" />
        </Badge>
      </div>
      <Table<ITalentPerformanceTalentMonitoring>
        header={TableHeader}
        data={[
          {
            id: "1",
            month: "January 2021",
            soft_skill: 5,
            hard_skill: 4,
            total_point: 9,
            notes: "Good job!",
          },
          {
            id: "2",
            month: "February 2021",
            soft_skill: 4,
            hard_skill: 5,
            total_point: 9,
            notes: "Good job!",
          },
          {
            id: "3",
            month: "March 2021",
            soft_skill: 5,
            hard_skill: 5,
            total_point: 10,
            notes: "Excelent!",
          },
        ]}
        loading={false}
      >
        <TableCell<ITalentPerformanceTalentMonitoring> name="soft_skill">
          {({ row }) => <StarRating rating={row.soft_skill} />}
        </TableCell>
        <TableCell<ITalentPerformanceTalentMonitoring> name="hard_skill">
          {({ row }) => <StarRating rating={row.hard_skill} />}
        </TableCell>
        <TableCell<ITalentPerformanceTalentMonitoring> name="total_point">
          {({ row }) => (
            <div className="flex items-center">
              {row.total_point}/10
              <Star className="w-4 h-4 fill-current text-amber-400" />
            </div>
          )}
        </TableCell>
      </Table>
    </div>
  );
}
