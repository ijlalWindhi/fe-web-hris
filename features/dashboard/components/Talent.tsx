"use client";
import React from "react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  TooltipProps,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  mapped: {
    label: "Mapped",
  },
  notMapped: {
    label: "Not Mapped",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 py-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background:
                  entry.name === "mapped" ? "hsl(var(--primary))" : "#F2F4F7",
              }}
            />
            <span className="font-base text-xs text-gray-600">
              {entry.name === "mapped" ? "Mapped: " : "Not Mapped: "}
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Talent() {
  return (
    <Card>
      <CardHeader className="pb-2 pt-0 md:pb-3">
        <CardTitle>Talent</CardTitle>
        <CardDescription>
          <DatePickerWithRange />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-2 h-36">
          <ChartContainer
            config={chartConfig}
            className="w-full min-h-[200px] max-h-[200px]"
          >
            <RadialBarChart
              data={[{ mapped: 3, notMapped: 1 }]}
              endAngle={180}
              innerRadius="80%"
              outerRadius="160%"
            >
              <defs>
                <linearGradient id="slaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) + 15}
                            className="fill-slate-900 text-3xl font-normal"
                          >
                            {10}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) - 20}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Talent
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="notMapped"
                stackId="a"
                cornerRadius={5}
                fill="#F2F4F7"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mapped"
                stackId="a"
                cornerRadius={5}
                fill="url(#slaGradient)"
                className="stroke-transparent stroke-2 fill-primary"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-8 mt-3">
          <div className="flex items-center gap-2 border px-4 py-1 rounded-full">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs md:text-sm text-gray-600">Mapped</span>
          </div>
          <div className="flex items-center gap-2 border px-4 py-1 rounded-full">
            <div className="w-3 h-3 rounded-full bg-[#F2F4F7]" />
            <span className="text-xs md:text-sm text-gray-600">Not Mapped</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
