import type { IconListLayout } from "@/variants/icon-list.variant";

export interface IconListItem {
  icon?: string;
  mediaId?: string;
  title: string;
  description?: string;
}

export interface IconListProps {
  items: IconListItem[];
  layout?: IconListLayout;
  mediaUrlById?: Record<string, string>;
}
