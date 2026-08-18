import type { ReactNode } from "react";
import type { CollectionShowcaseConfig } from "@/interfaces/collection-showcase.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";

export interface ProductSliderLayoutTemplateProps extends CollectionShowcaseConfig {
  slider: ReactNode;
  tone?: ActionLinkTone;
}
