import type { ReactNode } from "react";

export type ProductSliderLayoutTone = "primary" | "danger";

export interface ProductSliderLayoutTemplateProps {
  header?: ReactNode;
  slider: ReactNode;
  href?: string;
  actionLabel?: string;
  tone?: ProductSliderLayoutTone;
}
