import { dataSources } from "@/data-access/data-sources";
import type { MetaCategoryRecord, MetaObjectType } from "@/interfaces/meta.interface";

export async function getMetaCategoryById(
  categoryId?: string | null,
): Promise<MetaCategoryRecord | null> {
  if (!categoryId) return null;
  return dataSources.meta.getCategoryById(categoryId);
}

export async function getActiveMetaCategoriesByType(
  type: MetaObjectType,
): Promise<MetaCategoryRecord[]> {
  return dataSources.meta.getActiveCategoriesByType(type);
}

export async function getActiveMetaCategoryBySlug(
  type: MetaObjectType,
  slug?: string | null,
): Promise<MetaCategoryRecord | null> {
  if (!slug) return null;
  return dataSources.meta.getActiveCategoryBySlug(type, slug);
}
