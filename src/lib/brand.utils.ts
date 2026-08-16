import brandData from "@/data/wp-brand.json";
import type { BrandRecord } from "@/interfaces/brand.interface";

export function getActiveBrands() {
  return (brandData.brands as BrandRecord[])
    .filter((brand) => brand.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getFeaturedBrands(limit?: number) {
  const brands = getActiveBrands().filter((brand) => brand.featured === true);
  return typeof limit === "number" ? brands.slice(0, limit) : brands;
}
