"use client";

import * as React from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IInputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  onChangeIncrement?: (value: number) => void;
  onChangeDecrement?: (value: number) => void;
  min?: number;
  max?: number;
  readonly?: boolean;
}

export default function InputNumber({
  value = 0,
  onChange,
  onChangeIncrement,
  onChangeDecrement,
  min = 0,
  max = 99,
  readonly = false,
}: Readonly<IInputNumberProps>) {
  const [number, setNumber] = React.useState(value);
  const [displayValue, setDisplayValue] = React.useState(
    value === 0 ? "0" : value.toString(),
  );

  const increment = () => {
    const newValue = Math.min(number + 1, max);
    setNumber(newValue);
    setDisplayValue(newValue.toString());
    onChange?.(newValue);
    onChangeIncrement?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(number - 1, min);
    setNumber(newValue);
    setDisplayValue(newValue.toString());
    onChange?.(newValue);
    onChangeDecrement?.(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue === "") {
      inputValue = "0";
    }
    if (inputValue.startsWith("0") && inputValue.length > 1) {
      inputValue = inputValue.slice(1);
    }
    setDisplayValue(inputValue);

    const newValue = parseInt(inputValue) || 0;
    if (newValue >= min && newValue <= max) {
      setNumber(newValue);
      onChange?.(newValue);
    }
  };

  React.useEffect(() => {
    setNumber(value);
    setDisplayValue(value === 0 ? "0" : value.toString());
  }, [value]);

  return (
    <div className="w-full flex gap-0 items-center justify-between border rounded-full">
      <Button variant="ghost" size="icon" type="button" onClick={decrement}>
        <MinusCircle className="h-4 w-4 text-primary" />
      </Button>
      <Input
        type="number"
        value={displayValue}
        onChange={handleChange}
        min={min}
        max={max}
        className="text-center w-full border-0"
        readOnly={readonly}
      />
      <Button variant="ghost" size="icon" type="button" onClick={increment}>
        <PlusCircle className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
