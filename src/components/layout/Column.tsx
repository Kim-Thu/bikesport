import type { PropsWithChildren } from "react";

type ColumnProps = PropsWithChildren<{
  grow?: boolean;
  className?: string;
}>;

export function Column({ children, grow = false, className = "" }: ColumnProps) {
  return <div className={`${grow ? "min-w-0 flex-1" : "shrink-0"} ${className}`}>{children}</div>;
}
