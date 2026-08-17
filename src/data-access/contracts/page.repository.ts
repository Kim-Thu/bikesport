import type { PageRecord } from "@/interfaces/page.interface";

export interface PageRepository {
  findPublishedByPath(path: string): Promise<PageRecord | null>;
  findPublishedBySlug(slug: string): Promise<PageRecord | null>;
  listPublishedSlugs(): Promise<string[]>;
}
