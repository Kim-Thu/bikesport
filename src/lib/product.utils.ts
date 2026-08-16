import productData from "@/data/wp-products.json";
import type { ProductRecord } from "@/interfaces/product.interface";

export function getPublishedProducts() {
  return (productData.products as ProductRecord[]).filter((product) => product.status === "published");
}

export function getFeaturedProducts(limit?: number) {
  const products = getPublishedProducts().filter((product) => product.featured);
  return typeof limit === "number" ? products.slice(0, limit) : products;
}

export function getProductDiscountPercentage(product: ProductRecord) {
  if (!product.salePrice || product.salePrice >= product.price) return null;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function getProductPrimaryMediaId(product: ProductRecord) {
  return product.mediaIds[0];
}
