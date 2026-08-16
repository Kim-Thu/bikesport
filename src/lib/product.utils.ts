import productData from "@/data/wp-products.json";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getProductSalesBySku } from "@/lib/order.utils";
import { getProductReviewStatsBySku } from "@/lib/review.utils";

export function getPublishedProducts() {
  return (productData.products as ProductRecord[]).filter((product) => product.status === "published");
}

export function getFeaturedProducts(limit?: number) {
  const products = getPublishedProducts().filter((product) => product.featured);
  return typeof limit === "number" ? products.slice(0, limit) : products;
}

export function getBestSellerProducts(categoryId?: string | null, limit?: number) {
  const categoryIds = categoryId ? new Set(getCategoryTreeIds(categoryId)) : null;
  const salesBySku = getProductSalesBySku();
  const reviewStatsBySku = getProductReviewStatsBySku();

  const products = getPublishedProducts()
    .filter((product) => !categoryIds || product.categoryIds.some((id) => categoryIds.has(id)))
    .sort((a, b) => {
      const aSales = salesBySku.get(a.sku) ?? 0;
      const bSales = salesBySku.get(b.sku) ?? 0;
      const aReviews = reviewStatsBySku.get(a.sku);
      const bReviews = reviewStatsBySku.get(b.sku);
      const aScore = aSales + (aReviews?.positiveReviewCount ?? 0);
      const bScore = bSales + (bReviews?.positiveReviewCount ?? 0);

      if (aScore !== bScore) return bScore - aScore;
      if ((aReviews?.averageRating ?? 0) !== (bReviews?.averageRating ?? 0)) {
        return (bReviews?.averageRating ?? 0) - (aReviews?.averageRating ?? 0);
      }
      if ((aReviews?.reviewCount ?? 0) !== (bReviews?.reviewCount ?? 0)) {
        return (bReviews?.reviewCount ?? 0) - (aReviews?.reviewCount ?? 0);
      }

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return typeof limit === "number" ? products.slice(0, limit) : products;
}

export function getProductDiscountPercentage(product: ProductRecord) {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function getProductPrimaryMediaId(product: ProductRecord) {
  return product.mediaIds[0];
}
