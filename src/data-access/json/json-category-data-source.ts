import categoryData from "@/data/wp-category.json";
import type { CategoryDataSource } from "@/data-access/contracts/category-data-source.interface";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

const categories = categoryData.categories as CategoryRecord[];
const activeCategories = categories.filter((category) => category.status === "active");
const activeById = new Map(activeCategories.map((category) => [category._id, category]));
const activeByType = new Map<CategoryType, CategoryRecord[]>();

for (const category of activeCategories) {
  const items = activeByType.get(category.type) ?? [];
  items.push(category);
  activeByType.set(category.type, items);
}

for (const items of activeByType.values()) {
  items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const jsonCategoryDataSource: CategoryDataSource = {
  async getActiveById(categoryId) {
    return activeById.get(categoryId) ?? null;
  },
  async getActiveByType(type) {
    return activeByType.get(type) ?? [];
  },
  async getFeaturedByType(type, limit) {
    const items = (activeByType.get(type) ?? []).filter((category) => category.featured === true);
    return typeof limit === "number" ? items.slice(0, limit) : items;
  },
  async getActiveHierarchy() {
    return activeCategories;
  },
};
