import type { ReactNode } from "react";
import type { ActionLinkTone } from "@/components/link/ActionLink";

export interface ProductSliderLayoutTemplateProps {
  header?: ReactNode;
  slider: ReactNode;
  href?: string;
  actionLabel?: string;
  tone?: ActionLinkTone;
}
