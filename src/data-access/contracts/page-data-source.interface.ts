import type { PageRecord, PageSummary } from "@/interfaces/page.interface";

export interface PageDataSource {
  getPublished(): Promise<PageRecord[]>;
  getPublishedSummaries(): Promise<PageSummary[]>;
  getPublishedByPath(path: string): Promise<PageRecord | null>;
  getPublishedBySlug(slug: string): Promise<PageRecord | null>;
  getPublishedSlugs(): Promise<string[]>;
}
