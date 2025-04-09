import React from "react";
import { Star } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";

import { usePerformance } from "../hooks/useTalentMonitoring";
import { ITalentPerformanceTalentMonitoring } from "@/types";

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

interface ITalentPerformanceProps {
  talentId: string;
}

export default function TalentPerformance({
  talentId,
}: Readonly<ITalentPerformanceProps>) {
  // variables
  const { data, isLoading } = usePerformance(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex gap-2 items-center">
        <h2 className="md:text-lg font-semibold">Performance</h2>
        <Badge variant={"outline"}>
          <span className="text-primary mr-1">•</span> {data?.data?.performance}
          <Star className="ml-1 w-3 h-3 fill-current text-amber-400" />
        </Badge>
      </div>
      <Table<ITalentPerformanceTalentMonitoring>
        header={TableHeader}
        data={data?.data?.history ?? []}
        loading={isLoading}
      >
        <TableCell<ITalentPerformanceTalentMonitoring> name="month">
          {({ row }) => <span>{row.date}</span>}
        </TableCell>
        <TableCell<ITalentPerformanceTalentMonitoring> name="soft_skill">
          {({ row }) => <StarRating rating={row.softskill} />}
        </TableCell>
        <TableCell<ITalentPerformanceTalentMonitoring> name="hard_skill">
          {({ row }) => <StarRating rating={row.hardskill} />}
        </TableCell>
        <TableCell<ITalentPerformanceTalentMonitoring> name="total_point">
          {({ row }) => (
            <div className="flex items-center">
              {row.total_point}
              <Star className="w-4 h-4 fill-current text-amber-400" />
            </div>
          )}
        </TableCell>
      </Table>
    </div>
  );
}
