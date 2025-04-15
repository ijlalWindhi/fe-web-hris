import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

export interface InputPercentageProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  icon?: LucideIcon;
  iconClassName?: string;
  onChange?: (value: string | number) => void;
  value?: string | number;
  // Props to control whether the value is returned as a string or number
  returnValueAsNumber?: boolean;
}

const formatPercentage = (value: string): string => {
  // Keep only numbers and the first decimal point
  let formattedValue = "";
  let hasDecimal = false;

  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === "." && !hasDecimal) {
      formattedValue += char;
      hasDecimal = true;
    } else if (/\d/.test(char)) {
      formattedValue += char;
    }
  }

  return formattedValue;
};

const InputPercentage = React.forwardRef<
  HTMLInputElement,
  InputPercentageProps
>(
  (
    {
      className,
      icon,
      iconClassName,
      onChange,
      value,
      returnValueAsNumber = true,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = React.useState("");

    // Initialize initial value
    React.useEffect(() => {
      if (value !== undefined) {
        const stringValue = String(value);
        setDisplayValue(formatPercentage(stringValue));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      // Format value to display
      const formattedValue = formatPercentage(inputValue);
      setDisplayValue(formattedValue);

      // Call onChange with raw value
      if (onChange) {
        // Return value as number if returnValueAsNumber is true
        onChange(
          returnValueAsNumber
            ? formattedValue
              ? Number(formattedValue)
              : 0
            : formattedValue,
        );
      }
    };

    return (
      <div className="relative">
        <input
          type="text"
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-xs md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
        <div className="absolute text-xs md:text-sm inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
          %
        </div>
      </div>
    );
  },
);

InputPercentage.displayName = "InputPercentage";

export { InputPercentage };
