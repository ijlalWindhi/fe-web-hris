import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";

export interface InputCurrencyProps
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

const formatCurrency = (value: string): string => {
  // Delete all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format with dot every 3 digits
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
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
        setDisplayValue(formatCurrency(stringValue));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      // Format value to display
      const formattedValue = formatCurrency(inputValue);
      setDisplayValue(formattedValue);

      // Call onChange with raw value (without format)
      if (onChange) {
        const rawValue = formattedValue.replace(/\./g, "");
        // Return value as number if returnValueAsNumber is true
        onChange(
          returnValueAsNumber ? (rawValue ? Number(rawValue) : 0) : rawValue,
        );
      }
    };

    return (
      <div className="relative">
        <div className="absolute text-xs md:text-sm inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          Rp
        </div>

        <input
          type="text"
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-background pl-9 pr-3 py-2 text-xs md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  },
);

InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
