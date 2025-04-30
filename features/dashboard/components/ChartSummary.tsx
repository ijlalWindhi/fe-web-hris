import React, { useState, useEffect } from "react";
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
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";

import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { Button } from "@/components/ui/button";

import { cn } from "@/utils/utils";
import { SearchSchema } from "@/utils/global.schema";
import { useDashboard } from "../hooks/useDashboard";
import { Loader2 } from "lucide-react";

type ViewType = "daily" | "weekly" | "monthly";
type SearchFormValues = z.infer<typeof SearchSchema>;

const ChartSummary = () => {
  // Variables
  const [view, setView] = useState<ViewType>("monthly");
  const types: ViewType[] = ["daily", "weekly", "monthly"];
  const form = useForm<SearchFormValues>({
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
  const { data, isLoading, error } = useDashboard(startDate, endDate);

  // functions
  function formatDateForApi(date: Date | undefined): string | undefined {
    if (!date) return undefined;
    return format(date, "dd-MM-yyyy");
  }

  const handleViewChange = (newView: ViewType): void => {
    const now = new Date();
    let startDate: Date, endDate: Date;

    switch (newView) {
      case "monthly":
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case "weekly":
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case "daily":
        startDate = startOfDay(now);
        endDate = endOfDay(now);
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }

    form.setValue("search", {
      start: startDate,
      end: endDate,
    });

    setView(newView);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center md:justify-between">
        <h2 className="text-sm md:text-base font-medium">
          Attendance Graphics
        </h2>
        <div className="flex flex-wrap gap-2 md:items-center">
          <Form {...form}>
            <form>
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
            </form>
          </Form>
          {types.map((item) => (
            <Button
              key={item}
              type="button"
              onClick={() => handleViewChange(item)}
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.data}
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
        )}
      </div>
    </div>
  );
};

export default ChartSummary;
