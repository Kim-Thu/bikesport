import type { ReactNode } from "react";
import type { ActionLinkTone } from "@/variants/action-link.variant";

export interface ProductSliderLayoutTemplateProps {
  header?: ReactNode;
  slider: ReactNode;
  href?: string;
  actionLabel?: string;
  tone?: ActionLinkTone;
}
