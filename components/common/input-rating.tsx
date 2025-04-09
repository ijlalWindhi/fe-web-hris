"use client";
import type React from "react";
import { Star } from "lucide-react";

import { Label } from "@/components/ui/label";

import { cn } from "@/utils/utils";

interface RatingCategoryProps {
  name: string;
  label?: string;
  value: number;
  className?: string;
  onChange: (value: number) => void;
}

export const InputRating = ({
  name,
  value,
  label,
  className,
  onChange,
}: RatingCategoryProps) => {
  // Total of 5 stars, each can be empty, half, or full
  const totalStars = 5;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    starIndex: number,
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;

    // Temporary visual update (actual update happens on click)
    const stars = document.querySelectorAll(
      `[data-category="${name}"] .star-container`,
    );
    stars.forEach((star, idx) => {
      const starElement = star as HTMLElement;
      if (idx < starIndex) {
        // Previous stars are full
        starElement.setAttribute("data-state", "full");
      } else if (idx === starIndex) {
        // Current star is half or full based on mouse position
        starElement.setAttribute(
          "data-state",
          percent <= 0.5 ? "half" : "full",
        );
      } else {
        // Next stars are empty
        starElement.setAttribute("data-state", "empty");
      }
    });
  };

  const handleMouseLeave = () => {
    // Reset to actual value on mouse leave
    const stars = document.querySelectorAll(
      `[data-category="${name}"] .star-container`,
    );
    stars.forEach((star, idx) => {
      const starElement = star as HTMLElement;
      const fullStars = Math.floor(value / 2);
      const hasHalfStar = value % 2 === 1;

      if (idx < fullStars) {
        starElement.setAttribute("data-state", "full");
      } else if (idx === fullStars && hasHalfStar) {
        starElement.setAttribute("data-state", "half");
      } else {
        starElement.setAttribute("data-state", "empty");
      }
    });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    starIndex: number,
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;

    // If clicked on the left half of the star, select half star (1 point)
    // If clicked on the right half of the star, select full star (2 points)
    const newValue = starIndex * 2 + (percent <= 0.5 ? 1 : 2);
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="font-medium">
          {label || name}
          <span className="text-red-500">*</span>
        </Label>
      </div>
      <div
        className="flex justify-between items-center gap-1"
        data-category={name}
      >
        {Array.from({ length: totalStars }).map((_, index) => {
          const fullStars = Math.floor(value / 2);
          const hasHalfStar = value % 2 === 1;

          let state = "empty";
          if (index < fullStars) {
            state = "full";
          } else if (index === fullStars && hasHalfStar) {
            state = "half";
          }

          return (
            <div
              key={`${name}-star-${index}`}
              className="star-container relative cursor-pointer"
              data-state={state}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick(e, index)}
            >
              {/* Empty star (base) */}
              <Star className="h-6 w-6 text-gray-300" />

              {/* Half star */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden opacity-0 transition-opacity"
                style={{
                  opacity: state === "half" || state === "full" ? 1 : 0,
                }}
              >
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>

              {/* Full star */}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity"
                style={{ opacity: state === "full" ? 1 : 0 }}
              >
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          );
        })}
        <span className="ml-2 text-sm text-gray-500">({value}/10)</span>
      </div>
    </div>
  );
};
