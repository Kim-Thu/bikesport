import type { MetaCategoryRecord, MetaObjectType } from "@/interfaces/meta.interface";

export interface MetaDataSource {
  getCategoryById(categoryId: string): Promise<MetaCategoryRecord | null>;
  getActiveCategoriesByType(type: MetaObjectType): Promise<MetaCategoryRecord[]>;
  getActiveCategoryBySlug(type: MetaObjectType, slug: string): Promise<MetaCategoryRecord | null>;
}
