import productData from "@/data/wp-products.json";
import type { ProductDataSource } from "@/data-access/contracts/product-data-source.interface";
import type { ProductRecord } from "@/interfaces/product.interface";

const publishedProducts = (productData.products as ProductRecord[]).filter(
  (product) => product.status === "published",
);
const featuredProducts = publishedProducts.filter((product) => product.featured === true);
const publishedByBrandId = new Map<string, ProductRecord[]>();

for (const product of publishedProducts) {
  if (!product.brandId) continue;
  const items = publishedByBrandId.get(product.brandId) ?? [];
  items.push(product);
  publishedByBrandId.set(product.brandId, items);
}

function takeLimit<T>(items: T[], limit?: number): T[] {
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export const jsonProductDataSource: ProductDataSource = {
  async getPublished(limit) {
    return takeLimit(publishedProducts, limit);
  },
  async getFeatured(limit) {
    return takeLimit(featuredProducts, limit);
  },
  async getPublishedByBrandId(brandId, limit) {
    return takeLimit(publishedByBrandId.get(brandId) ?? [], limit);
  },
  async getPublishedByCategoryIds(categoryIds, limit) {
    const categoryIdSet = new Set(categoryIds);
    const items = publishedProducts.filter((product) =>
      product.categoryIds.some((categoryId) => categoryIdSet.has(categoryId)),
    );
    return takeLimit(items, limit);
  },
};
