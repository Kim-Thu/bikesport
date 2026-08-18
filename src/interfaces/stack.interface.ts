import type { ReactNode } from "react";

export type StackVariant = "surface" | "primary" | "cards";

export interface StackProps {
  children: ReactNode;
  variant?: StackVariant;
  className?: string;
}
