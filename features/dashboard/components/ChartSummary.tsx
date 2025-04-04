import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { Button } from "@/components/ui/button";

import { cn } from "@/utils/utils";
import { SearchSchema } from "@/utils/global.schema";

const data = [
  {
    date: "1 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "2 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "3 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "4 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "5 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "6 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "7 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "8 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "9 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
  {
    date: "10 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 0,
  },
];

export default function ChartSummary() {
  // variables
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: {
        start: undefined,
        end: undefined,
      },
    },
  });
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("monthly");
  const type: ("daily" | "weekly" | "monthly")[] = [
    "daily",
    "weekly",
    "monthly",
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center md:justify-between">
        <h2 className="text-sm md:text-base font-medium">
          Attendance Graphics
        </h2>
        <div className="flex flex-wrap gap-2 md:items-center">
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
          {type.map((item) => (
            <Button
              key={item}
              onClick={() => setView(item)}
              variant={view === item ? "default" : "outline"}
              className={cn(
                "capitalize w-20",
                view === item ? "" : "text-gray-800",
              )}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Bar dataKey="Attend" fill="#194DFF" />
            <Bar dataKey="Sick" fill="#101828" />
            <Bar dataKey="Leave" fill="#E8EDFF" />
            <Bar dataKey="Out of City" fill="#95ADFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
