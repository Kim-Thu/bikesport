export interface IconListItem {
  icon?: string;
  mediaId?: string;
  title: string;
  description?: string;
}

export interface IconListProps {
  items: IconListItem[];
  layout?: "list" | "grid";
}
