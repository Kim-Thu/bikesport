import type { ComponentItem } from "@/interfaces/component.interface";

export interface LayoutColumn {
  id?: string;
  grow?: boolean;
  items?: ComponentItem[];
}

export interface LayoutRow {
  id?: string;
  columns?: LayoutColumn[];
}
