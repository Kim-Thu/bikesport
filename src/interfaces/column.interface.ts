import type { ReactNode } from "react";

export interface ColumnProps {
  children: ReactNode;
  grow?: boolean;
  className?: string;
}
