"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/utils/utils";

/**
 * InputTimePicker is a time picker component that allows users to select time
 * using a dropdown.
 * How to use:
 * ```tsx
 * <InputField
        name="start_time"
        label="Set Time"
        control={form.control}
        render={({ field }) => (
            <InputTimePicker
                {...field}
                value={field.value}
                onChange={field.onChange}
            />
        )}
    />
 */
const InputTimePicker = forwardRef<
  HTMLInputElement,
  {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">
>(({ value: propValue, onChange: propOnChange, className, ...props }, ref) => {
  // variables
  const [time, setTime] = useState(propValue ?? "00:00");
  const [open, setOpen] = useState<boolean>(false);
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    (i * 1).toString().padStart(2, "0"),
  );

  // function
  const handleTimeChange = (value: string) => {
    setTime(value);
    propOnChange?.(value);
    setOpen(false);
  };

  // lifecycle
  useEffect(() => {
    if (propValue !== undefined) {
      setTime(propValue);
    }
  }, [propValue]);

  return (
    <div className={cn("w-full", className)}>
      <TimeInput
        value={time}
        onChange={(value) => {
          setTime(value);
          propOnChange?.(value);
        }}
        open={open}
        setOpen={setOpen}
        onTimeSelect={(value) => handleTimeChange(value)}
        hours={hours}
        minutes={minutes}
        ref={ref}
        {...props}
      />
    </div>
  );
});
InputTimePicker.displayName = "InputTimePicker";

interface ITimeInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onTimeSelect: (value: string) => void; // Renamed from onSelect to avoid conflict
  hours: string[];
  minutes: string[];
}

const TimeInput = forwardRef<HTMLInputElement, ITimeInputProps>(
  (
    { value, onChange, open, setOpen, onTimeSelect, hours, minutes, ...props },
    ref,
  ) => {
    const [hour, minute] = value.split(":");

    const handleHourChange = (newHour: string) => {
      onChange(`${newHour}:${minute}`);
    };

    const handleMinuteChange = (newMinute: string) => {
      onChange(`${hour}:${newMinute}`);
    };

    const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Only allow numbers and colon
      if (!/^[0-9:]*$/.test(value)) return;

      if (value.includes(":")) {
        const [h, m] = value.split(":");

        // Validate hours and minutes
        if (h.length <= 2 && m.length <= 2) {
          const hour = Number.parseInt(h);
          const minute = Number.parseInt(m);

          if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
            onChange(`${h.padStart(2, "0")}:${m.padStart(2, "0")}`);
          }
        }
      } else {
        // Handle case when user is typing and hasn't added colon yet
        if (value.length <= 2) {
          const hour = Number.parseInt(value);
          if (hour >= 0 && hour < 24) {
            onChange(`${value.padStart(2, "0")}:${minute}`);
          }
        }
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <input
              type="text"
              value={value}
              onChange={handleManualInput}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              ref={ref}
              {...props}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
              type="button"
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0" align="start">
          <div className="grid grid-cols-2 max-h-60 overflow-auto">
            <div className="border-r overflow-y-auto max-h-60">
              <div className="font-medium px-2 py-1 text-xs text-gray-500 sticky top-0 bg-background">
                Hour
              </div>
              {hours.map((h) => (
                <div
                  key={h}
                  className={cn(
                    "px-2 py-1 cursor-pointer hover:bg-muted",
                    h === hour && "bg-muted",
                  )}
                  onClick={() => {
                    handleHourChange(h);
                    onTimeSelect(`${h}:${minute}`);
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            <div className="overflow-y-auto max-h-60">
              <div className="font-medium px-2 py-1 text-xs text-gray-500 sticky top-0 bg-background">
                Minute
              </div>
              {minutes.map((m) => (
                <div
                  key={m}
                  className={cn(
                    "px-2 py-1 cursor-pointer hover:bg-muted",
                    m === minute && "bg-muted",
                  )}
                  onClick={() => {
                    handleMinuteChange(m);
                    onTimeSelect(`${hour}:${m}`);
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
TimeInput.displayName = "TimeInput";

export default InputTimePicker;
