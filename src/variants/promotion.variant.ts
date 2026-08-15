export const PROMOTION_VARIANT = {
  TEXT: "text",
  IMAGE: "image",
} as const;

export type PromotionVariant = (typeof PROMOTION_VARIANT)[keyof typeof PROMOTION_VARIANT];
