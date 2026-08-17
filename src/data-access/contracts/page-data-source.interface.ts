import type { PageRecord } from "@/interfaces/page.interface";

export interface PageDataSource {
  getPublishedByPath(path: string): Promise<PageRecord | null>;
  getPublishedBySlug(slug: string): Promise<PageRecord | null>;
  getPublishedSlugs(): Promise<string[]>;
}
