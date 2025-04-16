/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useController, Control } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/utils/utils";

interface DatePickerWithRangeProps {
  className?: string;
  name: string;
  control: Control<z.infer<any>> | undefined;
  onChange?: (value: { start?: Date; end?: Date }) => void;
  value?: { start?: Date; end?: Date };
  placeholder?: string;
}

export function DatePickerWithRange({
  className,
  name,
  control,
  onChange,
  value,
  placeholder = "Pick a date",
}: Readonly<DatePickerWithRangeProps>) {
  const {
    field: { value: fieldValue, onChange: fieldOnChange },
  } = useController({
    name,
    control,
  });
  const [date, setDate] = React.useState<DateRange | undefined>(
    fieldValue
      ? {
          from: fieldValue.start,
          to: fieldValue.end,
        }
      : undefined,
  );

  // functions
  const handleDateChange = useCallback(
    (selectedDate: DateRange | undefined) => {
      setDate(selectedDate);

      const newValue = selectedDate
        ? {
            start: selectedDate.from,
            end: selectedDate.to,
          }
        : { start: undefined, end: undefined };

      fieldOnChange(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [fieldOnChange, onChange],
  );

  // lifecycle
  useEffect(() => {
    if (value && !date) {
      setDate({
        from: value.start,
        to: value.end,
      });
    } else if (value && date) {
      const newDate = {
        from: value.start,
        to: value.end,
      };
      setDate(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal text-black",
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
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
