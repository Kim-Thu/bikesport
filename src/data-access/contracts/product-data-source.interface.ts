import type { ProductRecord } from "@/interfaces/product.interface";

export interface ProductDataSource {
  getPublished(limit?: number): Promise<ProductRecord[]>;
  getFeatured(limit?: number): Promise<ProductRecord[]>;
  getPublishedByBrandId(brandId: string, limit?: number): Promise<ProductRecord[]>;
  getPublishedByCategoryIds(categoryIds: string[], limit?: number): Promise<ProductRecord[]>;
}
