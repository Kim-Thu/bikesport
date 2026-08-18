import type { ReactNode } from "react";
import type { CollectionShowcaseConfig } from "@/interfaces/collection-showcase.interface";

export interface TabsGridTemplateProps extends CollectionShowcaseConfig {
  header: ReactNode;
  grid: ReactNode;
  pagination?: ReactNode;
}
