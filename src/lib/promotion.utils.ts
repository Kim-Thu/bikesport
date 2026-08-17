import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { ProductDataFilter } from "@/data-access/contracts/product-data-source.interface";
import type {
  PercentageDiscountBenefit,
  PromotionRecord,
} from "@/interfaces/promotion.interface";
import type { ProductRecord } from "@/interfaces/product.interface";

const getPromotionByIdCached = cache((promotionId: string) => dataSources.promotion.getById(promotionId));
const getActivePromotionCandidates = cache(() => dataSources.promotion.getActive());
const getPublishedProductBySku = cache(async (sku: string): Promise<ProductRecord | null> => {
  const products = await dataSources.product.getPublishedByFilter({ skus: [sku] }, 1);
  return products[0] ?? null;
});

export function isPromotionActive(promotion: PromotionRecord, now: Date = new Date()): boolean {
  if (promotion.status !== "active") return false;

  const timestamp = now.getTime();
  const startAt = promotion.startAt ? new Date(promotion.startAt).getTime() : null;
  const endAt = promotion.endAt ? new Date(promotion.endAt).getTime() : null;

  if (startAt !== null && Number.isFinite(startAt) && timestamp < startAt) return false;
  if (endAt !== null && Number.isFinite(endAt) && timestamp > endAt) return false;

  return true;
}

export async function getPromotionById(promotionId?: string | null): Promise<PromotionRecord | null> {
  if (!promotionId) return null;
  return getPromotionByIdCached(promotionId);
}

export async function getActivePromotionById(
  promotionId?: string | null,
  now: Date = new Date(),
): Promise<PromotionRecord | null> {
  const promotion = await getPromotionById(promotionId);
  return promotion && isPromotionActive(promotion, now) ? promotion : null;
}

export async function getActivePromotions(now: Date = new Date()): Promise<PromotionRecord[]> {
  const promotions = await getActivePromotionCandidates();
  return promotions.filter((promotion) => isPromotionActive(promotion, now));
}

function getPercentageBenefit(promotion: PromotionRecord): PercentageDiscountBenefit | null {
  return (
    promotion.benefits.find(
      (benefit): benefit is PercentageDiscountBenefit => benefit.type === "percentage_discount",
    ) ?? null
  );
}

function hasTargetSelectors(promotion: PromotionRecord): boolean {
  const target = promotion.target;
  return Boolean(
    target.skus?.length ||
      target.categoryIds?.length ||
      target.tagIds?.length ||
      target.brandIds?.length,
  );
}

function matchesTarget(product: ProductRecord, promotion: PromotionRecord): boolean {
  const target = promotion.target;
  if (target.type === "cart") return false;
  if (target.excludeSkus?.includes(product.sku)) return false;

  const selectors: boolean[] = [];

  if (target.skus?.length) selectors.push(target.skus.includes(product.sku));
  if (target.categoryIds?.length) {
    selectors.push(product.categoryIds.some((categoryId) => target.categoryIds?.includes(categoryId)));
  }
  if (target.tagIds?.length) {
    selectors.push(product.tagIds.some((tagId) => target.tagIds?.includes(tagId)));
  }
  if (target.brandIds?.length) {
    selectors.push(Boolean(product.brandId && target.brandIds.includes(product.brandId)));
  }

  if (!selectors.length) return true;
  return target.match === "all" ? selectors.every(Boolean) : selectors.some(Boolean);
}

function getProductFilter(promotion: PromotionRecord): ProductDataFilter {
  const target = promotion.target;
  return {
    skus: target.skus,
    categoryIds: target.categoryIds,
    tagIds: target.tagIds,
    brandIds: target.brandIds,
    excludeSkus: target.excludeSkus,
    match: target.match,
  };
}

function getIntrinsicDiscountPercentage(product: ProductRecord): number | null {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

function sortPromotionProducts(items: ProductRecord[], promotion: PromotionRecord): ProductRecord[] {
  const skuOrder = promotion.target.skus ?? [];
  const skuRank = new Map(skuOrder.map((sku, index) => [sku, index]));

  return [...items].sort((a, b) => {
    if (skuRank.size) {
      const aIndex = skuRank.get(a.sku);
      const bIndex = skuRank.get(b.sku);

      if (aIndex !== bIndex) {
        if (aIndex === undefined) return 1;
        if (bIndex === undefined) return -1;
        return aIndex - bIndex;
      }
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export async function getPromotionProducts(
  promotion: PromotionRecord,
  limit?: number,
): Promise<ProductRecord[]> {
  let matchedProducts: ProductRecord[];

  if (promotion.target.type === "cart") return [];

  if (hasTargetSelectors(promotion)) {
    matchedProducts = await dataSources.product.getPublishedByFilter(getProductFilter(promotion));
  } else {
    const percentage = getPercentageBenefit(promotion)?.percentage;
    const products = await dataSources.product.getPublished();
    matchedProducts = products.filter((product) => {
      if (typeof percentage !== "number") return true;
      return getIntrinsicDiscountPercentage(product) === percentage;
    });
  }

  const sortedProducts = sortPromotionProducts(matchedProducts, promotion);
  return typeof limit === "number" ? sortedProducts.slice(0, limit) : sortedProducts;
}

export function getPromotionTitle(promotion: PromotionRecord): string {
  if (promotion.display?.title) return promotion.display.title;

  const sourceDate = promotion.startAt ? new Date(promotion.startAt) : new Date();
  const month = sourceDate.getMonth() + 1;
  return `Ưu đãi tháng ${month}`;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value) + "đ";
}

export function getPromotionDescription(promotion: PromotionRecord): string | undefined {
  const descriptions = promotion.benefits.map((benefit) => {
    switch (benefit.type) {
      case "percentage_discount":
        return `Giảm đến ${benefit.percentage}%`;
      case "fixed_discount":
        return `Giảm ${formatMoney(benefit.amount)}`;
      case "voucher":
        return benefit.valueType === "percentage"
          ? `Voucher ${benefit.value}%`
          : `Voucher ${formatMoney(benefit.value)}`;
      case "buy_x_get_y":
        return `Mua ${benefit.buyQuantity} tặng ${benefit.getQuantity}`;
      case "gift":
        return `Tặng ${benefit.quantity} sản phẩm`;
      case "free_shipping":
        return "Miễn phí vận chuyển";
    }
  });

  return descriptions.filter(Boolean).join(" + ") || undefined;
}

export function getPromotionProductPricing(product: ProductRecord, promotion: PromotionRecord) {
  const percentageBenefit = getPercentageBenefit(promotion);
  if (percentageBenefit) {
    const rawDiscount = Math.round((product.price * percentageBenefit.percentage) / 100);
    const discount = percentageBenefit.maxDiscountAmount
      ? Math.min(rawDiscount, percentageBenefit.maxDiscountAmount)
      : rawDiscount;

    return {
      salePrice: Math.max(0, product.price - discount),
      discountPercentage: percentageBenefit.percentage,
    };
  }

  const fixedDiscount = promotion.benefits.find((benefit) => benefit.type === "fixed_discount");
  if (fixedDiscount?.type === "fixed_discount") {
    return {
      salePrice: Math.max(0, product.price - fixedDiscount.amount),
      discountPercentage: null,
    };
  }

  return {
    salePrice: null,
    discountPercentage: null,
  };
}

export async function getActivePromotionsForSku(
  sku: string,
  now: Date = new Date(),
): Promise<PromotionRecord[]> {
  const product = await getPublishedProductBySku(sku);
  if (!product) return [];

  const promotions = await getActivePromotions(now);
  return promotions
    .filter((promotion) => matchesTarget(product, promotion))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export function findActivePromotionForProduct(
  product: ProductRecord,
  promotions: PromotionRecord[],
): PromotionRecord | null {
  return promotions.find((promotion) => matchesTarget(product, promotion)) ?? null;
}
