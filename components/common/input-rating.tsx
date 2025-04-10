"use client";
import { Star } from "lucide-react";

import { Label } from "@/components/ui/label";

import { cn } from "@/utils/utils";

interface InputRatingProps {
  name: string;
  label?: string;
  value: number;
  className?: string;
  maxRating?: number;
  onChange: (value: number) => void;
}

export const InputRating = ({
  name,
  label,
  value,
  className,
  onChange,
  maxRating = 5,
}: InputRatingProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="font-medium">
          {label || name}
          <span className="text-red-500">*</span>
        </Label>
      </div>
      <div className="flex justify-between items-center gap-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={`${name}-star-${index}`}
              type="button"
              className="focus:outline-none"
              onClick={() => onChange(starValue)}
            >
              <Star
                className={`h-6 w-6 ${
                  starValue <= value
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-gray-300"
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
