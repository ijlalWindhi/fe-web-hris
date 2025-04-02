/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useController, Control } from "react-hook-form";
import { z } from "zod";

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

  // Convert value format for compatibility
  const [date, setDate] = React.useState<DateRange | undefined>(
    fieldValue
      ? {
          from: fieldValue.start,
          to: fieldValue.end,
        }
      : undefined,
  );

  // Effect to sync the initial value from form if provided
  React.useEffect(() => {
    if (value) {
      setDate({
        from: value.start,
        to: value.end,
      });

      fieldOnChange({
        start: value.start,
        end: value.end,
      });
    }
  }, [value, fieldOnChange]);

  // Handle date change
  const handleDateChange = React.useCallback(
    (selectedDate: DateRange | undefined) => {
      setDate(selectedDate);

      // Convert to { start, end } format for form integration
      const newValue = selectedDate
        ? {
            start: selectedDate.from,
            end: selectedDate.to,
          }
        : { start: undefined, end: undefined };

      // Update form value
      fieldOnChange(newValue);

      // Call external onChange if provided
      if (onChange) {
        onChange(newValue);
      }
    },
    [fieldOnChange, onChange],
  );

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
