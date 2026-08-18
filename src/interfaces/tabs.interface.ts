import type { MediaItem } from "@/interfaces/media.interface";
import type { PromotionSessionStatus } from "@/interfaces/promotion.interface";

export interface TabItem {
  label: string;
  value: string;
  mediaId?: string | null;
  media?: MediaItem | null;
  status?: PromotionSessionStatus;
  startAt?: string;
  endAt?: string;
}

export interface TabTemplateProps {
  item: TabItem;
  active: boolean;
  onClick: () => void;
}
