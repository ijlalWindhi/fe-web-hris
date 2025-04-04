"use client";
import * as React from "react";
import {
  format,
  parse,
  isAfter,
  isBefore,
  isValid,
  startOfDay,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/utils/utils";

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date | string | undefined) => void;
  onBlur?: () => void;
  formatValue?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      onBlur,
      formatValue = "dd MMMM yyyy",
      minDate,
      maxDate,
      placeholder = "Pick a date",
      disabled = false,
    },
    ref,
  ) => {
    // Convert string date to Date object if needed
    const date =
      value instanceof Date
        ? value
        : value
          ? parse(value as string, formatValue, new Date())
          : undefined;

    // Convert minDate and maxDate to start of day for accurate comparison
    const normalizedMinDate = React.useMemo(
      () => (minDate ? startOfDay(minDate) : undefined),
      [minDate],
    );

    const normalizedMaxDate = React.useMemo(
      () => (maxDate ? startOfDay(maxDate) : undefined),
      [maxDate],
    );

    // Validate the current date against min/max constraints
    const isDateValid = React.useMemo(() => {
      if (!date || !isValid(date)) return false;

      const normalizedDate = startOfDay(date);

      if (normalizedMinDate && isBefore(normalizedDate, normalizedMinDate))
        return false;
      if (normalizedMaxDate && isAfter(normalizedDate, normalizedMaxDate))
        return false;

      return true;
    }, [date, normalizedMinDate, normalizedMaxDate]);

    const handleSelect = (newDate: Date | undefined) => {
      if (newDate) {
        const normalizedNewDate = startOfDay(newDate);

        // Check if the selected date is within bounds
        if (normalizedMinDate && isBefore(normalizedNewDate, normalizedMinDate))
          return;
        if (normalizedMaxDate && isAfter(normalizedNewDate, normalizedMaxDate))
          return;

        // Format the date as string before passing to onChange
        const formattedDate = format(newDate, formatValue);
        onChange?.(formattedDate);
      } else {
        onChange?.(undefined);
      }
    };

    return (
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              onBlur={onBlur}
              className={cn(
                "w-full text-xs md:text-sm justify-start text-left font-normal !rounded-full",
                !isDateValid && "text-muted-foreground",
              )}
              disabled={disabled}
            >
              {isDateValid ? (
                format(date!, formatValue)
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" ref={ref}>
            <Calendar
              mode="single"
              selected={isDateValid ? date : undefined}
              onSelect={handleSelect}
              initialFocus
              fromDate={normalizedMinDate}
              toDate={normalizedMaxDate}
              disabled={(date) => {
                const normalizedDate = startOfDay(date);
                if (
                  normalizedMinDate &&
                  isBefore(normalizedDate, normalizedMinDate)
                )
                  return true;
                if (
                  normalizedMaxDate &&
                  isAfter(normalizedDate, normalizedMaxDate)
                )
                  return true;
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
