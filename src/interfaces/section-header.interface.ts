import type { ReactNode } from "react";

export type SectionHeaderTemplate = "default" | "flash-sale" | "featured";

export interface SectionHeaderProps {
  title?: string;
  titleMediaId?: string | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  template?: SectionHeaderTemplate;
  countdownAt?: string;
  className?: string;
  children?: ReactNode;
}
