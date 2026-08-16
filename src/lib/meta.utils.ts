import wpMeta from "@/data/wp-meta.json";
import type { MetaCategoryRecord, MetaData, MetaObjectType } from "@/interfaces/meta.interface";

const metaData = wpMeta as MetaData;
const categoryIndex = new Map<string, MetaCategoryRecord>(
  metaData.categories.map((category) => [category._id, category]),
);

export function getMetaCategoryById(categoryId?: string | null): MetaCategoryRecord | null {
  if (!categoryId) return null;
  return categoryIndex.get(categoryId) ?? null;
}

export function getActiveMetaCategoriesByType(type: MetaObjectType): MetaCategoryRecord[] {
  return metaData.categories.filter(
    (category) => category.type === type && category.status === "active",
  );
}

export function getActiveMetaCategoryBySlug(
  type: MetaObjectType,
  slug?: string | null,
): MetaCategoryRecord | null {
  if (!slug) return null;

  return (
    metaData.categories.find(
      (category) =>
        category.type === type && category.slug === slug && category.status === "active",
    ) ?? null
  );
}
