import type { ElementType, ReactNode } from "react";

export interface SectionProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}
