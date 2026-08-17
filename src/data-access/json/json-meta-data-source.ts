import wpMeta from "@/data/wp-meta.json";
import type { MetaDataSource } from "@/data-access/contracts/meta-data-source.interface";
import type { MetaCategoryRecord, MetaData } from "@/interfaces/meta.interface";

const categories = (wpMeta as MetaData).categories;
const categoryById = new Map<string, MetaCategoryRecord>(
  categories.map((category) => [category._id, category]),
);

export const jsonMetaDataSource: MetaDataSource = {
  async getCategoryById(categoryId) {
    return categoryById.get(categoryId) ?? null;
  },
  async getActiveCategoriesByType(type) {
    return categories.filter((category) => category.type === type && category.status === "active");
  },
  async getActiveCategoryBySlug(type, slug) {
    return (
      categories.find(
        (category) =>
          category.type === type && category.slug === slug && category.status === "active",
      ) ?? null
    );
  },
};
