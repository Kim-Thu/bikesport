import type { ReactNode } from "react";

export interface TabsGridTemplateProps {
  header: ReactNode;
  grid: ReactNode;
  pagination?: ReactNode;
  href?: string;
  actionLabel?: string;
  backgroundMediaId?: string | null;
}
