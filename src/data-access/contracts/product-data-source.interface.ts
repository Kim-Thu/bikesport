import type { ProductRecord } from "@/interfaces/product.interface";

export interface ProductDataFilter {
  ids?: string[];
  skus?: string[];
  categoryIds?: string[];
  tagIds?: string[];
  brandIds?: string[];
  excludeSkus?: string[];
  match?: "any" | "all";
}

export interface ProductDataSource {
  getPublished(limit?: number): Promise<ProductRecord[]>;
  getPublishedBySlug(slug: string): Promise<ProductRecord | null>;
  getPublishedSkus(categoryIds?: string[]): Promise<string[]>;
  getFeatured(limit?: number): Promise<ProductRecord[]>;
  getPublishedByBrandId(brandId: string, limit?: number): Promise<ProductRecord[]>;
  getPublishedByCategoryIds(categoryIds: string[], limit?: number): Promise<ProductRecord[]>;
  getPublishedByFilter(filter: ProductDataFilter, limit?: number): Promise<ProductRecord[]>;
}
