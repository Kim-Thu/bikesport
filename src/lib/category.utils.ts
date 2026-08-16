import categoryData from "@/data/wp-category.json";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

export function getCategoriesByType(type: CategoryType) {
  return (categoryData.categories as CategoryRecord[])
    .filter((category) => category.type === type && category.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getFeaturedCategoriesByType(type: CategoryType, limit?: number) {
  const categories = getCategoriesByType(type).filter((category) => category.featured === true);

  return typeof limit === "number" ? categories.slice(0, limit) : categories;
}
