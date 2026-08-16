import type { PromotionVariant } from "@/variants/promotion.variant";

export type PromotionStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";

export interface PromotionRecord {
  _id: string;
  name: string;
  slug: string;
  status: PromotionStatus;
  type: PromotionVariant;
  content?: string;
  mediaId?: string;
  alt?: string;
  href?: string;
  ctaLabel?: string;
  iconMediaId?: string;
  startAt?: string;
  endAt?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionData {
  promotions: PromotionRecord[];
}

export interface PromotionProps {
  promotionId: string;
}
