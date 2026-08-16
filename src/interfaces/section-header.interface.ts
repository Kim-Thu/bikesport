import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  template?: "default";
  className?: string;
  children?: ReactNode;
}
