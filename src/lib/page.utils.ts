import { dataSources } from "@/data-access/data-sources";
import type { PageRecord } from "@/interfaces/page.interface";

export async function getPublishedPageByPath(path: string): Promise<PageRecord | null> {
  return dataSources.page.getPublishedByPath(path);
}

export async function getPublishedPageBySlug(slug: string): Promise<PageRecord | null> {
  return dataSources.page.getPublishedBySlug(slug);
}

export async function getPublishedPageSlugs(): Promise<string[]> {
  return dataSources.page.getPublishedSlugs();
}
