import type { ColumnProps } from "@/interfaces/column.interface";
import { cn } from "@/lib/classname.utils";

export function Column({ children, grow = false, className = "" }: ColumnProps) {
  return (
    <div
      className={cn(
        "flex self-stretch flex-col",
        grow ? "min-w-0 flex-1" : "shrink-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
