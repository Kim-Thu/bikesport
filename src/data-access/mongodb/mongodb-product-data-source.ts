import type {
  ProductDataFilter,
  ProductDataSource,
} from "@/data-access/contracts/product-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { ProductRecord } from "@/interfaces/product.interface";

function buildPublishedFilter(filter: ProductDataFilter): Record<string, unknown> {
  const clauses: Record<string, unknown>[] = [{ status: "published" }];
  const selectors: Record<string, unknown>[] = [];

  if (filter.excludeSkus?.length) clauses.push({ sku: { $nin: filter.excludeSkus } });
  if (filter.skus?.length) selectors.push({ sku: { $in: filter.skus } });
  if (filter.categoryIds?.length) selectors.push({ categoryIds: { $in: filter.categoryIds } });
  if (filter.tagIds?.length) selectors.push({ tagIds: { $in: filter.tagIds } });
  if (filter.brandIds?.length) selectors.push({ brandId: { $in: filter.brandIds } });

  if (selectors.length) {
    clauses.push(filter.match === "all" ? { $and: selectors } : { $or: selectors });
  }

  return clauses.length === 1 ? clauses[0] : { $and: clauses };
}

export function createMongoProductDataSource(getDatabase: MongoDatabaseProvider): ProductDataSource {
  return {
    async getPublished(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published" });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getFeatured(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", featured: true });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getPublishedByBrandId(brandId, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", brandId });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getPublishedByCategoryIds(categoryIds, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", categoryIds: { $in: categoryIds } });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getPublishedByFilter(filter, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find(buildPublishedFilter(filter));
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
