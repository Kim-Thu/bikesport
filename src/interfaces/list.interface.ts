import type { Key, ReactNode } from "react";

export interface CListItem {
  key: Key;
  content: ReactNode;
  className?: string;
}

export interface CListProps {
  items: CListItem[];
  ordered?: boolean;
  className?: string;
  itemClassName?: string;
}
