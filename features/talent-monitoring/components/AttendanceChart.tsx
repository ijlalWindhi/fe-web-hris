import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { InputField } from "@/components/common/input-field";

import { useAttendance } from "../hooks/useTalentMonitoring";
import { SearchSchema } from "../schemas/talent-monitoring.schema";
import { IParamsSearch } from "@/types";

const chartConfig = {
  desktop: {
    label: "Jumlah",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface IAttendanceChartProps {
  form: UseFormReturn<z.infer<typeof SearchSchema>>;
  params: IParamsSearch;
  sharedDateRange: { start?: Date; end?: Date };
  onDateRangeChange: (value: { start?: Date; end?: Date }) => void;
}

export default function AttendanceChart({
  form,
  params,
  sharedDateRange,
  onDateRangeChange,
}: IAttendanceChartProps) {
  // variables
  const { data } = useAttendance(params);

  // functions
  const handleDateChange = (value: { start?: Date; end?: Date }) => {
    onDateRangeChange(value);
  };

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <h2 className="md:text-lg font-semibold">Attendance Graph</h2>
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
