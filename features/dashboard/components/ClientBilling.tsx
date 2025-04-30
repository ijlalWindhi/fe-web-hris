"use client";
import React from "react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  TooltipProps,
} from "recharts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
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

import { SearchSchema } from "@/utils/global.schema";
import { useBilling } from "../hooks/useDashboard";

const chartConfig = {
  complete: {
    label: "Complete",
  },
  pending: {
    label: "Pending",
  },
  overdue: {
    label: "Overdue",
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
                  entry.name === "complete"
                    ? "hsl(var(--primary))"
                    : entry.name === "overdue"
                      ? "#95ADFF"
                      : "#E8EDFF",
              }}
            />
            <span className="font-base text-xs text-gray-600">
              {entry.name === "complete"
                ? "Complete: "
                : entry.name === "overdue"
                  ? "Overdue: "
                  : "Pending: "}
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ClientBilling() {
  // variables
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: {
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      },
    },
  });
  const startDate = formatDateForApi(form.watch("search.start"));
  const endDate = formatDateForApi(form.watch("search.end"));
  const { data, isLoading, error } = useBilling(startDate, endDate);

  // functions
  function formatDateForApi(date: Date | undefined): string | undefined {
    if (!date) return undefined;
    return format(date, "dd-MM-yyyy");
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-0 md:pb-3">
        <CardTitle>Client Billing</CardTitle>
        <CardDescription>
          <Form {...form}>
            <InputField
              name="search"
              control={form.control}
              render={({ field }) => (
                <DatePickerWithRange
                  name="search"
                  control={form.control}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select date range"
                />
              )}
            />
          </Form>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading data
          </div>
        )}
        {!isLoading && !error && data?.data && (
          <>
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-2">
              <ChartContainer
                config={chartConfig}
                className="w-full min-h-[160px] max-h-[160px]"
              >
                <RadialBarChart
                  data={data?.data?.result ?? []}
                  startAngle={250}
                  endAngle={-70}
                  innerRadius={70}
                  outerRadius={100}
                >
                  <ChartTooltip cursor={false} content={<CustomTooltip />} />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy ?? 0) + 30}
                                className="fill-slate-900 text-xl md:text-3xl font-normal"
                              >
                                {data?.data?.total ?? 0}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy ?? 0) - 5}
                                className="fill-muted-foreground text-xs md:text-sm"
                              >
                                Client Billing
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="complete"
                    stackId="a"
                    cornerRadius={999}
                    fill="hsl(var(--primary))"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="overdue"
                    stackId="a"
                    cornerRadius={999}
                    fill="#95ADFF"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="pending"
                    stackId="a"
                    cornerRadius={999}
                    fill="#E8EDFF"
                    className="stroke-transparent stroke-2"
                  />
                </RadialBarChart>
              </ChartContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-3 w-fit">
              <div className="flex items-center gap-2 border px-4 py-1 rounded-full">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs md:text-sm text-gray-600">
                  Complete
                </span>
              </div>
              <div className="flex items-center gap-2 border px-4 py-1 rounded-full">
                <div className="w-3 h-3 rounded-full bg-[#95ADFF]" />
                <span className="text-xs md:text-sm text-gray-600">
                  Overdue
                </span>
              </div>
              <div className="flex items-center gap-2 border px-4 py-1 rounded-full">
                <div className="w-3 h-3 rounded-full bg-[#E8EDFF]" />
                <span className="text-xs md:text-sm text-gray-600">
                  Pending
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
