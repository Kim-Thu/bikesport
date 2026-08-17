import type { SeoObjectType, SeoRecord } from "@/interfaces/seo.interface";

export interface SeoDataSource {
  getByEntity(objectType: SeoObjectType, objectId: string): Promise<SeoRecord | null>;
  getByPath(path: string): Promise<SeoRecord | null>;
}
