import type { ColumnProps } from "@/interfaces/column.interface";

export function Column({ children, grow = false, className = "" }: ColumnProps) {
  return <div className={`${grow ? "min-w-0 flex-1" : "shrink-0"} ${className}`}>{children}</div>;
}
