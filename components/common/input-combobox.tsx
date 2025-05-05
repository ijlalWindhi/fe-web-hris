"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/utils/utils";

interface InputComboboxProps<TFieldValues extends FieldValues> {
  options: { label: string; value: string }[];
  placeholder?: string;
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const InputCombobox = <TFieldValues extends FieldValues>({
  options,
  placeholder = "Select",
  field,
  onChange,
  disabled = false,
  className,
}: InputComboboxProps<TFieldValues>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
          >
            <p className="truncate">
              {field.value
                ? options.find((option) => option.value === field.value)?.label
                : placeholder}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    field.onChange(option.value);
                    onChange?.(option.value);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === field.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InputCombobox;
