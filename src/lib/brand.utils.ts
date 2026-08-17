import brandData from "@/data/wp-brand.json";
import type { BrandRecord } from "@/interfaces/brand.interface";

const activeBrands = (brandData.brands as BrandRecord[])
  .filter((brand) => brand.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const featuredBrands = activeBrands.filter((brand) => brand.featured === true);
const activeBrandById = new Map(activeBrands.map((brand) => [brand._id, brand]));

export function getBrandById(brandId: string): BrandRecord | null {
  return activeBrandById.get(brandId) ?? null;
}

export function getActiveBrands(limit?: number): BrandRecord[] {
  return typeof limit === "number" ? activeBrands.slice(0, limit) : activeBrands;
}

export function getFeaturedBrands(limit?: number): BrandRecord[] {
  return typeof limit === "number" ? featuredBrands.slice(0, limit) : featuredBrands;
}
