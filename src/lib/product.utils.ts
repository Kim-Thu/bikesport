import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { ProductRecord } from "@/interfaces/product.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getRankedProductSalesStats } from "@/lib/order.utils";

export async function getPublishedProducts(limit?: number): Promise<ProductRecord[]> {
  return cachedDomain(
    "product",
    ["published", String(limit ?? "all")],
    () => dataSources.product.getPublished(limit),
  );
}

export async function getPublishedProductsByIds(ids: string[], limit?: number): Promise<ProductRecord[]> {
  const uniqueIds = [...new Set(ids)].sort();
  if (!uniqueIds.length) return [];

  return cachedDomain(
    "product",
    ["by-ids", ...uniqueIds, "limit", String(limit ?? "all")],
    () => dataSources.product.getPublishedByFilter({ ids: uniqueIds }, limit),
    uniqueIds.map((id) => CACHE_TAG.entity("product", id)),
  );
}

export async function getPublishedProductsByBrandId(
  brandId: string,
  limit?: number,
): Promise<ProductRecord[]> {
  return cachedDomain(
    "product",
    ["brand", brandId, "limit", String(limit ?? "all")],
    () => dataSources.product.getPublishedByBrandId(brandId, limit),
    [CACHE_TAG.entity("brand", brandId)],
  );
}

export async function getPublishedProductsByCategoryIds(
  categoryIds: string[],
  limit?: number,
): Promise<ProductRecord[]> {
  const uniqueCategoryIds = [...new Set(categoryIds)].sort();
  if (!uniqueCategoryIds.length) return [];

  return cachedDomain(
    "product",
    ["categories", ...uniqueCategoryIds, "limit", String(limit ?? "all")],
    () => dataSources.product.getPublishedByCategoryIds(uniqueCategoryIds, limit),
    uniqueCategoryIds.map((categoryId) => CACHE_TAG.entity("category", categoryId)),
  );
}

async function getPublishedProductSkus(categoryIds?: string[]): Promise<string[]> {
  const uniqueCategoryIds = categoryIds?.length ? [...new Set(categoryIds)].sort() : [];
  return cachedDomain(
    "product",
    ["published-skus", ...(uniqueCategoryIds.length ? uniqueCategoryIds : ["all"])],
    () => dataSources.product.getPublishedSkus(uniqueCategoryIds.length ? uniqueCategoryIds : undefined),
    uniqueCategoryIds.map((categoryId) => CACHE_TAG.entity("category", categoryId)),
  );
}

export async function getFeaturedProducts(limit?: number): Promise<ProductRecord[]> {
  return cachedDomain(
    "product",
    ["featured", String(limit ?? "all")],
    () => dataSources.product.getFeatured(limit),
  );
}

const getBestSellerProductsCached = cache(
  async (categoryId?: string | null, limit?: number): Promise<ProductRecord[]> => {
    if (typeof limit === "number" && limit <= 0) return [];

    const categoryIds = categoryId ? await getCategoryTreeIds(categoryId) : undefined;
    const publishedSkus = await getPublishedProductSkus(categoryIds ?? undefined);
    if (!publishedSkus.length) return [];

    const rankedSales = await getRankedProductSalesStats(publishedSkus, limit);
    if (!rankedSales.length) return [];

    const rankedSkus = rankedSales.map((row) => row.sku);
    const products = await dataSources.product.getPublishedByFilter(
      { skus: rankedSkus },
      rankedSkus.length,
    );
    const productBySku = new Map(products.map((product) => [product.sku, product]));

    return rankedSkus
      .map((sku) => productBySku.get(sku))
      .filter((product): product is ProductRecord => Boolean(product));
  },
);

export async function getBestSellerProducts(
  categoryId?: string | null,
  limit?: number,
): Promise<ProductRecord[]> {
  return getBestSellerProductsCached(categoryId, limit);
}

export function getProductDiscountPercentage(product: ProductRecord) {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function getProductPrimaryMediaId(product: ProductRecord) {
  return product.mediaIds[0];
}
