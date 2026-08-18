import type { ComponentItem } from "@/interfaces/component.interface";
import type {
  LayoutColumnPreset,
  LayoutRowPreset,
} from "@/variants/layout-config.variant";

export interface LayoutColumn {
  id?: string;
  grow?: boolean;
  layout?: LayoutColumnPreset;
  items?: ComponentItem[];
}

export interface LayoutRow {
  id?: string;
  layout?: LayoutRowPreset;
  columns?: LayoutColumn[];
}
