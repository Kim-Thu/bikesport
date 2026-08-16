import categoryData from "@/data/wp-category.json";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

const categories = categoryData.categories as CategoryRecord[];

export function getCategoryById(categoryId: string): CategoryRecord | null {
  return categories.find((category) => category._id === categoryId && category.status === "active") ?? null;
}

export function getCategoriesByType(type: CategoryType) {
  return categories
    .filter((category) => category.type === type && category.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getFeaturedCategoriesByType(type: CategoryType, limit?: number) {
  const items = getCategoriesByType(type).filter((category) => category.featured === true);

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getCategoryTreeIds(categoryId: string): string[] {
  const ids = new Set<string>([categoryId]);
  let changed = true;

  while (changed) {
    changed = false;
    categories.forEach((category) => {
      if (category.parentId && ids.has(category.parentId) && !ids.has(category._id)) {
        ids.add(category._id);
        changed = true;
      }
    });
  }

  return [...ids];
}
