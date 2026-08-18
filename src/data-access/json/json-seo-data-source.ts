import wpSeo from "@/data/wp-seo.json";
import type { SeoDataSource } from "@/data-access/contracts/seo-data-source.interface";
import type { SeoData, SeoRecord } from "@/interfaces/seo.interface";

function normalizePath(path: string): string {
  const normalized = path.trim();
  if (!normalized) return "/";
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;
}

const records = (wpSeo as SeoData).seo;
const seoByEntity = new Map<string, SeoRecord>();
const seoByPath = new Map<string, SeoRecord>();

for (const record of records) {
  if (record.objectId) seoByEntity.set(`${record.objectType}:${record.objectId}`, record);
  if (record.path) seoByPath.set(normalizePath(record.path), record);
}

export const jsonSeoDataSource: SeoDataSource = {
  async getByEntity(objectType, objectId) {
    return seoByEntity.get(`${objectType}:${objectId}`) ?? null;
  },
  async getByPath(path) {
    return seoByPath.get(normalizePath(path)) ?? null;
  },
};
