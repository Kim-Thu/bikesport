import type { RowProps } from "@/interfaces/row.interface";
import { cn } from "@/lib/classname.utils";

export function Row({ children, className = "" }: RowProps) {
  return <div className={cn("flex items-center", className)}>{children}</div>;
}
