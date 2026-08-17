import brandData from "@/data/wp-brand.json";
import type { BrandDataSource } from "@/data-access/contracts/brand-data-source.interface";
import type { BrandRecord } from "@/interfaces/brand.interface";

const activeBrands = (brandData.brands as BrandRecord[])
  .filter((brand) => brand.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const featuredBrands = activeBrands.filter((brand) => brand.featured === true);
const activeById = new Map(activeBrands.map((brand) => [brand._id, brand]));

export const jsonBrandDataSource: BrandDataSource = {
  async getActive(limit) {
    return typeof limit === "number" ? activeBrands.slice(0, limit) : activeBrands;
  },
  async getFeatured(limit) {
    return typeof limit === "number" ? featuredBrands.slice(0, limit) : featuredBrands;
  },
  async getActiveById(brandId) {
    return activeById.get(brandId) ?? null;
  },
};
