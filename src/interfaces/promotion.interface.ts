import type { PromotionVariant } from "@/variants/promotion.variant";

export interface PromotionProps {
  type?: PromotionVariant;
  content?: string;
  mediaId?: string;
  alt?: string;
  href?: string;
  ctaLabel?: string;
  iconMediaId?: string;
}
