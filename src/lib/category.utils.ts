import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

const getActiveHierarchy = cache(() => dataSources.category.getActiveHierarchy());

export async function getCategoryById(categoryId: string): Promise<CategoryRecord | null> {
  return dataSources.category.getActiveById(categoryId);
}

export async function getCategoriesByType(type: CategoryType): Promise<CategoryRecord[]> {
  return dataSources.category.getActiveByType(type);
}

export async function getFeaturedCategoriesByType(type: CategoryType, limit?: number) {
  return dataSources.category.getFeaturedByType(type, limit);
}

export async function getCategoryTreeIds(categoryId: string): Promise<string[]> {
  const categories = await getActiveHierarchy();
  const childIdsByParentId = new Map<string, string[]>();

  for (const category of categories) {
    if (!category.parentId) continue;
    const childIds = childIdsByParentId.get(category.parentId) ?? [];
    childIds.push(category._id);
    childIdsByParentId.set(category.parentId, childIds);
  }

  const ids: string[] = [];
  const queue = [categoryId];
  const seen = new Set<string>();

  while (queue.length) {
    const currentId = queue.shift();
    if (!currentId || seen.has(currentId)) continue;

    seen.add(currentId);
    ids.push(currentId);
    queue.push(...(childIdsByParentId.get(currentId) ?? []));
  }

  return ids;
}
