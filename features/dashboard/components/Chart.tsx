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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

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
    Attend: 50,
    Sick: 20,
    Leave: 25,
    "Out of City": 0,
  },
  {
    date: "3 Jan",
    Attend: 30,
    Sick: 45,
    Leave: 8,
    "Out of City": 5,
  },
  {
    date: "4 Jan",
    Attend: 0,
    Sick: 0,
    Leave: 0,
    "Out of City": 8,
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
    Attend: 40,
    Sick: 15,
    Leave: 0,
    "Out of City": 8,
  },
  {
    date: "7 Jan",
    Attend: 30,
    Sick: 8,
    Leave: 60,
    "Out of City": 45,
  },
  {
    date: "8 Jan",
    Attend: 10,
    Sick: 8,
    Leave: 15,
    "Out of City": 40,
  },
  {
    date: "9 Jan",
    Attend: 8,
    Sick: 30,
    Leave: 15,
    "Out of City": 20,
  },
  {
    date: "10 Jan",
    Attend: 40,
    Sick: 20,
    Leave: 0,
    "Out of City": 10,
  },
];

export default function Chart() {
  // variables
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("monthly");
  const type: ("daily" | "weekly" | "monthly")[] = [
    "daily",
    "weekly",
    "monthly",
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center md:justify-between">
        <h2 className="text-sm md:text-base">Attendance Graphics</h2>
        <div className="flex flex-wrap gap-2 md:items-center">
          <DatePickerWithRange className="w-full md:w-auto" />
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
