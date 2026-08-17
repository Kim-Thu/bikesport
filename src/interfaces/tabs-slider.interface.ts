import type { ReactNode } from "react";

export interface TabsSliderTemplateProps {
  header: ReactNode;
  slider: ReactNode;
  href?: string;
  actionLabel?: string;
  backgroundMediaId?: string | null;
}
