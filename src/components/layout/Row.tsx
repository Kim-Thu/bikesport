import type { PropsWithChildren } from "react";

type RowProps = PropsWithChildren<{
  className?: string;
}>;

export function Row({ children, className = "" }: RowProps) {
  return <div className={`flex items-center ${className}`}>{children}</div>;
}
