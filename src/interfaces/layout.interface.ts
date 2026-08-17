import type { ComponentItem } from "@/interfaces/component.interface";

export interface LayoutColumn {
  id?: string;
  grow?: boolean;
  className?: string;
  items?: ComponentItem[];
}

export interface LayoutRow {
  id?: string;
  className?: string;
  columns?: LayoutColumn[];
}
