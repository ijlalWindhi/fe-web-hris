import { Star } from "lucide-react";

import { cn } from "@/utils/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  color = "text-amber-400",
  className,
}: Readonly<StarRatingProps>) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClass[size],
            "transition-colors",
            index < rating ? color : "text-muted stroke-muted",
            "fill-current",
          )}
        />
      ))}
    </div>
  );
}
