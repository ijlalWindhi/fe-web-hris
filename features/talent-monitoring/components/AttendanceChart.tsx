import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";

const chartData = [
  { type: "Hadir", desktop: 20 },
  { type: "Absen", desktop: 2 },
  { type: "Sakit", desktop: 3 },
  { type: "Cuti", desktop: 0 },
  { type: "Lembur", desktop: 2 },
  { type: "Early Leave", desktop: 1 },
  { type: "Terlambat", desktop: 0 },
  { type: "Izin", desktop: 1 },
];

const chartConfig = {
  desktop: {
    label: "Jumlah",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function AttendanceChart() {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <h2 className="md:text-lg font-semibold">Attendance Graph</h2>
        <DatePickerWithRange className="w-full md:w-auto" />
      </div>
      <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
        <RadarChart data={chartData}>
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
