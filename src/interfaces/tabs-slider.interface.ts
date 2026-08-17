import type { ReactNode } from "react";
import type { CollectionShowcaseConfig } from "@/interfaces/collection-showcase.interface";

export interface TabsSliderTemplateProps extends CollectionShowcaseConfig {
  header: ReactNode;
  slider: ReactNode;
}
