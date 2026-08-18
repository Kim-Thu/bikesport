import { dataSources } from "@/data-access/data-sources";
import type { BrandRecord } from "@/interfaces/brand.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

export async function getBrandById(brandId: string): Promise<BrandRecord | null> {
  return cachedDomain(
    "brand",
    ["active-by-id", brandId],
    () => dataSources.brand.getActiveById(brandId),
    [CACHE_TAG.entity("brand", brandId)],
  );
}

export async function getActiveBrands(limit?: number): Promise<BrandRecord[]> {
  return cachedDomain(
    "brand",
    ["active", String(limit ?? "all")],
    () => dataSources.brand.getActive(limit),
  );
}

export async function getActiveBrandBySlug(slug: string): Promise<BrandRecord | null> {
  return cachedDomain(
    "brand",
    ["active-by-slug", slug],
    () => dataSources.brand.getActiveBySlug(slug),
    [CACHE_TAG.domain("brand")],
  );
}

export async function getFeaturedBrands(limit?: number): Promise<BrandRecord[]> {
  return cachedDomain(
    "brand",
    ["featured", String(limit ?? "all")],
    () => dataSources.brand.getFeatured(limit),
  );
}
