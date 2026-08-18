import type { SeoDataSource } from "@/data-access/contracts/seo-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { SeoRecord } from "@/interfaces/seo.interface";

function normalizePath(path: string): string {
  const normalized = path.trim();
  if (!normalized) return "/";
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;
}

export function createMongoSeoDataSource(
  getDatabase: MongoDatabaseProvider,
): SeoDataSource {
  return {
    async getByEntity(objectType, objectId) {
      const database = await getDatabase();
      return database
        .collection<SeoRecord>(MONGODB_COLLECTIONS.seo)
        .findOne({ objectType, objectId });
    },
    async getByPath(path) {
      const database = await getDatabase();
      return database
        .collection<SeoRecord>(MONGODB_COLLECTIONS.seo)
        .findOne({ path: normalizePath(path) });
    },
  };
}
