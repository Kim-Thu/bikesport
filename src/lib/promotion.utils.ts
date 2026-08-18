import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { ProductDataFilter } from "@/data-access/contracts/product-data-source.interface";
import type {
  PercentageDiscountBenefit,
  PromotionRecord,
} from "@/interfaces/promotion.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

const getPromotionByIdCached = (promotionId: string) =>
  cachedDomain(
    "promotion",
    ["id", promotionId],
    () => dataSources.promotion.getById(promotionId),
    [CACHE_TAG.entity("promotion", promotionId)],
  );

const getActivePromotionCandidates = () =>
  cachedDomain("promotion", ["active-candidates"], () => dataSources.promotion.getActive());

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

    const aDiscount = getIntrinsicDiscountPercentage(a) ?? 0;
    const bDiscount = getIntrinsicDiscountPercentage(b) ?? 0;
    if (aDiscount !== bDiscount) return bDiscount - aDiscount;

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export async function getPromotionProducts(
  promotion: PromotionRecord,
  limit?: number,
): Promise<ProductRecord[]> {
  if (promotion.target.type === "cart") return [];

  const filter = getProductFilter(promotion);
  const candidates = hasTargetSelectors(promotion)
    ? await dataSources.product.getPublishedByFilter(filter)
    : await dataSources.product.getPublished();
  const matching = candidates.filter((product) => matchesTarget(product, promotion));
  const sorted = sortPromotionProducts(matching, promotion);

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export async function getProductsByPromotionId(
  promotionId?: string | null,
  limit?: number,
): Promise<ProductRecord[]> {
  const promotion = await getActivePromotionById(promotionId);
  if (!promotion) return [];
  return getPromotionProducts(promotion, limit);
}

export async function getPromotionDiscountPercentageBySku(
  promotionId: string,
  sku: string,
): Promise<number | null> {
  const [promotion, product] = await Promise.all([
    getActivePromotionById(promotionId),
    getPublishedProductBySku(sku),
  ]);

  if (!promotion || !product || !matchesTarget(product, promotion)) return null;

  const percentageBenefit = getPercentageBenefit(promotion);
  return percentageBenefit?.value ?? getIntrinsicDiscountPercentage(product);
}
