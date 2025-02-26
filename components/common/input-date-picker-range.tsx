"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
}

export function DatePickerWithRange({
  className,
}: Readonly<DatePickerWithRangeProps>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 11, 27),
    to: new Date(2025, 0, 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal text-black",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMMM yyyy")} -{" "}
                  {format(date.to, "dd MMMM yyyy")}
                </>
              ) : (
                format(date.from, "dd MMMM yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
