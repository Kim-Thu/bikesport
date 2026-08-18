import { Star } from "lucide-react";
import { cn } from "@/lib/classname.utils";

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
}

export function Rating({ value, count, className }: RatingProps) {
  const roundedValue = Math.round(value);

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Đánh giá ${value.toFixed(1)} trên 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={12}
            strokeWidth={2}
            className={cn(index < roundedValue ? "fill-amber-400 text-amber-400" : "text-gray-300")}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-700">{value.toFixed(1)}</span>
      {typeof count === "number" ? <span className="text-xs text-gray-400">({count})</span> : null}
    </div>
  );
}
