import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";

export interface CategoryDataSource {
  getActiveById(categoryId: string): Promise<CategoryRecord | null>;
  getActiveByType(type: CategoryType): Promise<CategoryRecord[]>;
  getFeaturedByType(type: CategoryType, limit?: number): Promise<CategoryRecord[]>;
  getActiveHierarchy(): Promise<CategoryRecord[]>;
}
