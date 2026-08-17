import type { ReactNode } from "react";
import type { CollectionShowcaseConfig } from "@/interfaces/collection-showcase.interface";
import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { TabItem } from "@/interfaces/tabs.interface";

export interface TabsSliderGroup extends TabItem {
  items: ProductCollectionItem[];
}

export interface TabsSliderTemplateProps extends CollectionShowcaseConfig {
  header: ReactNode;
  slider: ReactNode;
}
