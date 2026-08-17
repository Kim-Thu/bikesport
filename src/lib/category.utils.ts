import categoryData from "@/data/wp-category.json";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

const categories = categoryData.categories as CategoryRecord[];
const activeCategories = categories.filter((category) => category.status === "active");
const activeCategoryById = new Map(activeCategories.map((category) => [category._id, category]));
const activeCategoriesByType = new Map<CategoryType, CategoryRecord[]>();
const childCategoryIdsByParentId = new Map<string, string[]>();
const categoryTreeIdsCache = new Map<string, string[]>();

for (const category of activeCategories) {
  const typeItems = activeCategoriesByType.get(category.type) ?? [];
  typeItems.push(category);
  activeCategoriesByType.set(category.type, typeItems);

  if (category.parentId) {
    const childIds = childCategoryIdsByParentId.get(category.parentId) ?? [];
    childIds.push(category._id);
    childCategoryIdsByParentId.set(category.parentId, childIds);
  }
}

for (const typeItems of activeCategoriesByType.values()) {
  typeItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getCategoryById(categoryId: string): CategoryRecord | null {
  return activeCategoryById.get(categoryId) ?? null;
}

export function getCategoriesByType(type: CategoryType): CategoryRecord[] {
  return activeCategoriesByType.get(type) ?? [];
}

export function getFeaturedCategoriesByType(type: CategoryType, limit?: number) {
  const items = getCategoriesByType(type).filter((category) => category.featured === true);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getCategoryTreeIds(categoryId: string): string[] {
  const cached = categoryTreeIdsCache.get(categoryId);
  if (cached) return cached;

  const ids: string[] = [];
  const queue = [categoryId];
  const seen = new Set<string>();

  while (queue.length) {
    const currentId = queue.shift();
    if (!currentId || seen.has(currentId)) continue;

    seen.add(currentId);
    ids.push(currentId);
    queue.push(...(childCategoryIdsByParentId.get(currentId) ?? []));
  }

  categoryTreeIdsCache.set(categoryId, ids);
  return ids;
}
