import React from "react";
interface Option {
  label: string;
  value: string;
}

interface RadioButtonProps {
  label?: string;
  options: Option[];
  className?: string;
  direction?: "row" | "column";
  value: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  options,
  className = "",
  direction = "row",
  value,
  onChange,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="mb-2 font-medium block">{label}</label>}
      <div
        className={`flex gap-4 ${direction === "column" ? "flex-col" : "flex-row"}`}
      >
        {options?.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="appearance-none w-4 h-4 rounded-full border-2 border-primary checked:bg-primary checked:border-primary focus:outline-none focus:ring-primary relative checked:bg-white checked:before:content-[''] checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:w-2 checked:before:h-2 checked:before:bg-primary checked:before:rounded-full checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
