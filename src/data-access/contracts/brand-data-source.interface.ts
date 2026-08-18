import type { BrandRecord } from "@/interfaces/brand.interface";

export interface BrandDataSource {
  getActive(limit?: number): Promise<BrandRecord[]>;
  getFeatured(limit?: number): Promise<BrandRecord[]>;
  getActiveById(brandId: string): Promise<BrandRecord | null>;
}
