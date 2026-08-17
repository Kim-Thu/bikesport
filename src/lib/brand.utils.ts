import { dataSources } from "@/data-access/data-sources";
import type { BrandRecord } from "@/interfaces/brand.interface";

export async function getBrandById(brandId: string): Promise<BrandRecord | null> {
  return dataSources.brand.getActiveById(brandId);
}

export async function getActiveBrands(limit?: number): Promise<BrandRecord[]> {
  return dataSources.brand.getActive(limit);
}

export async function getFeaturedBrands(limit?: number): Promise<BrandRecord[]> {
  return dataSources.brand.getFeatured(limit);
}
