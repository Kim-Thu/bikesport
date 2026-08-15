import type { RowProps } from "@/interfaces/row.interface";

export function Row({ children, className = "" }: RowProps) {
  return <div className={`flex items-center ${className}`}>{children}</div>;
}
