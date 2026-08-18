import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { ProductRecord } from "@/interfaces/product.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getProductSalesStatsBySku } from "@/lib/order.utils";

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

export async function getFeaturedProducts(limit?: number): Promise<ProductRecord[]> {
  return cachedDomain(
    "product",
    ["featured", String(limit ?? "all")],
    () => dataSources.product.getFeatured(limit),
  );
}

const getBestSellerProductsCached = cache(async (categoryId?: string | null): Promise<ProductRecord[]> => {
  const categoryIds = categoryId ? await getCategoryTreeIds(categoryId) : null;
  const products = categoryIds
    ? await getPublishedProductsByCategoryIds(categoryIds)
    : await getPublishedProducts();
  const salesBySku = await getProductSalesStatsBySku(products.map((product) => product.sku));

  return products
    .filter((product) => salesBySku.has(product.sku))
    .sort((a, b) => {
      const aSales = salesBySku.get(a.sku);
      const bSales = salesBySku.get(b.sku);
      const quantityDifference = (bSales?.quantity ?? 0) - (aSales?.quantity ?? 0);

      if (quantityDifference !== 0) return quantityDifference;

      const purchaseRecencyDifference =
        new Date(bSales?.lastPurchasedAt ?? 0).getTime() -
        new Date(aSales?.lastPurchasedAt ?? 0).getTime();

      if (purchaseRecencyDifference !== 0) return purchaseRecencyDifference;

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
});

export async function getBestSellerProducts(
  categoryId?: string | null,
  limit?: number,
): Promise<ProductRecord[]> {
  const items = await getBestSellerProductsCached(categoryId);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getProductDiscountPercentage(product: ProductRecord) {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function getProductPrimaryMediaId(product: ProductRecord) {
  return product.mediaIds[0];
}
