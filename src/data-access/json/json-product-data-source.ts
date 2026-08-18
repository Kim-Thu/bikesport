import productData from "@/data/wp-products.json";
import type {
  ProductDataFilter,
  ProductDataSource,
} from "@/data-access/contracts/product-data-source.interface";
import type { ProductRecord } from "@/interfaces/product.interface";

const publishedProducts = (productData.products as ProductRecord[]).filter(
  (product) => product.status === "published",
);
const featuredProducts = publishedProducts.filter((product) => product.featured === true);
const publishedBySlug = new Map(publishedProducts.map((product) => [product.slug, product]));
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

function matchesFilter(product: ProductRecord, filter: ProductDataFilter): boolean {
  if (filter.excludeSkus?.includes(product.sku)) return false;

  const selectors: boolean[] = [];
  if (filter.ids?.length) selectors.push(filter.ids.includes(product._id));
  if (filter.skus?.length) selectors.push(filter.skus.includes(product.sku));
  if (filter.categoryIds?.length) {
    selectors.push(product.categoryIds.some((id) => filter.categoryIds?.includes(id)));
  }
  if (filter.tagIds?.length) {
    selectors.push(product.tagIds.some((id) => filter.tagIds?.includes(id)));
  }
  if (filter.brandIds?.length) {
    selectors.push(Boolean(product.brandId && filter.brandIds.includes(product.brandId)));
  }

  if (!selectors.length) return true;
  return filter.match === "all" ? selectors.every(Boolean) : selectors.some(Boolean);
}

export const jsonProductDataSource: ProductDataSource = {
  async getPublished(limit) {
    return takeLimit(publishedProducts, limit);
  },
  async getPublishedBySlug(slug) {
    return publishedBySlug.get(slug) ?? null;
  },
  async getPublishedSkus(categoryIds) {
    if (!categoryIds?.length) return publishedProducts.map((product) => product.sku);

    const categoryIdSet = new Set(categoryIds);
    return publishedProducts
      .filter((product) => product.categoryIds.some((categoryId) => categoryIdSet.has(categoryId)))
      .map((product) => product.sku);
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
  async getPublishedByFilter(filter, limit) {
    return takeLimit(publishedProducts.filter((product) => matchesFilter(product, filter)), limit);
  },
};