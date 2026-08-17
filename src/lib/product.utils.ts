import productData from "@/data/wp-products.json";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getProductSalesStatsBySku } from "@/lib/order.utils";

const products = productData.products as ProductRecord[];
const publishedProducts = products.filter((product) => product.status === "published");
const featuredProducts = publishedProducts.filter((product) => product.featured);
const publishedProductsByBrandId = new Map<string, ProductRecord[]>();
const bestSellerCache = new Map<string, ProductRecord[]>();

for (const product of publishedProducts) {
  if (!product.brandId) continue;
  const brandProducts = publishedProductsByBrandId.get(product.brandId) ?? [];
  brandProducts.push(product);
  publishedProductsByBrandId.set(product.brandId, brandProducts);
}

export function getPublishedProducts(): ProductRecord[] {
  return publishedProducts;
}

export function getPublishedProductsByBrandId(brandId: string, limit?: number): ProductRecord[] {
  const items = publishedProductsByBrandId.get(brandId) ?? [];
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getFeaturedProducts(limit?: number): ProductRecord[] {
  return typeof limit === "number" ? featuredProducts.slice(0, limit) : featuredProducts;
}

export function getBestSellerProducts(categoryId?: string | null, limit?: number) {
  const cacheKey = categoryId ?? "*";
  let items = bestSellerCache.get(cacheKey);

  if (!items) {
    const categoryIds = categoryId ? new Set(getCategoryTreeIds(categoryId)) : null;
    const salesBySku = getProductSalesStatsBySku();

    items = publishedProducts
      .filter((product) => !categoryIds || product.categoryIds.some((id) => categoryIds.has(id)))
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

    bestSellerCache.set(cacheKey, items);
  }

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getProductDiscountPercentage(product: ProductRecord) {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function getProductPrimaryMediaId(product: ProductRecord) {
  return product.mediaIds[0];
}
