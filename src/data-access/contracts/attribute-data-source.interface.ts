import type { AttributeRecord } from "@/interfaces/attribute.interface";

export interface AttributeDataSource {
  getById(id: string): Promise<AttributeRecord | null>;
  getActive(): Promise<AttributeRecord[]>;
  getActiveBySlug(slug: string): Promise<AttributeRecord | null>;
}
