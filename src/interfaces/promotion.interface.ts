export type PromotionStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";
export type PromotionTargetType = "product" | "category" | "brand" | "cart";
export type PromotionTargetMatch = "any" | "all";
export type PromotionBenefitType =
  | "percentage_discount"
  | "fixed_discount"
  | "voucher"
  | "buy_x_get_y"
  | "gift"
  | "free_shipping";

export interface PromotionTarget {
  type: PromotionTargetType;
  match?: PromotionTargetMatch;
  skus?: string[];
  categoryIds?: string[];
  tagIds?: string[];
  brandIds?: string[];
  excludeSkus?: string[];
}

export interface PromotionCondition {
  minQuantity?: number;
  minSubtotal?: number;
  customerGroupIds?: string[];
}

export interface PromotionDisplay {
  title?: string;
  href?: string;
  actionLabel?: string;
  badgeMediaId?: string | null;
}

export interface PromotionInventoryItem {
  sku: string;
  total: number;
}

export interface PromotionProductBadge {
  sku: string;
  mediaId: string;
  alt: string;
}

export interface PercentageDiscountBenefit {
  type: "percentage_discount";
  percentage: number;
  maxDiscountAmount?: number;
}

export interface FixedDiscountBenefit {
  type: "fixed_discount";
  amount: number;
}

export interface VoucherBenefit {
  type: "voucher";
  code: string;
  valueType: "percentage" | "fixed";
  value: number;
  maxDiscountAmount?: number;
}

export interface BuyXGetYBenefit {
  type: "buy_x_get_y";
  buyProductId: string;
  buyQuantity: number;
  getProductId: string;
  getQuantity: number;
  getDiscountPercentage?: number;
}

export interface GiftBenefit {
  type: "gift";
  giftProductId: string;
  quantity: number;
}

export interface FreeShippingBenefit {
  type: "free_shipping";
  maxShippingDiscount?: number;
}

export type PromotionBenefit =
  | PercentageDiscountBenefit
  | FixedDiscountBenefit
  | VoucherBenefit
  | BuyXGetYBenefit
  | GiftBenefit
  | FreeShippingBenefit;

export interface PromotionRecord {
  _id: string;
  name: string;
  slug: string;
  status: PromotionStatus;
  priority?: number;
  stackable?: boolean;
  target: PromotionTarget;
  conditions?: PromotionCondition;
  benefits: PromotionBenefit[];
  display?: PromotionDisplay;
  inventory?: PromotionInventoryItem[];
  productBadges?: PromotionProductBadge[];
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
