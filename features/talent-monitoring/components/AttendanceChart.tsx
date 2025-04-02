import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

import { useAttendance } from "../hooks/useTalentMonitoring";

const chartConfig = {
  desktop: {
    label: "Jumlah",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface IAttendanceChartProps {
  talentId: string;
}

export default function AttendanceChart({ talentId }: IAttendanceChartProps) {
  // variables
  const { data } = useAttendance(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <h2 className="md:text-lg font-semibold">Attendance Graph</h2>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
        <RadarChart
          data={Array.isArray(data?.data?.graph) ? data?.data?.graph : []}
        >
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="type" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}
