import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getProductSalesStatsBySku } from "@/lib/order.utils";

export async function getPublishedProducts(limit?: number): Promise<ProductRecord[]> {
  return dataSources.product.getPublished(limit);
}

export async function getPublishedProductsByIds(ids: string[], limit?: number): Promise<ProductRecord[]> {
  return dataSources.product.getPublishedByFilter({ ids }, limit);
}

export async function getPublishedProductsByBrandId(
  brandId: string,
  limit?: number,
): Promise<ProductRecord[]> {
  return dataSources.product.getPublishedByBrandId(brandId, limit);
}

export async function getPublishedProductsByCategoryIds(
  categoryIds: string[],
  limit?: number,
): Promise<ProductRecord[]> {
  return dataSources.product.getPublishedByCategoryIds(categoryIds, limit);
}

export async function getFeaturedProducts(limit?: number): Promise<ProductRecord[]> {
  return dataSources.product.getFeatured(limit);
}

const getBestSellerProductsCached = cache(async (categoryId?: string | null): Promise<ProductRecord[]> => {
  const categoryIds = categoryId ? await getCategoryTreeIds(categoryId) : null;
  const products = categoryIds
    ? await dataSources.product.getPublishedByCategoryIds(categoryIds)
    : await dataSources.product.getPublished();
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
