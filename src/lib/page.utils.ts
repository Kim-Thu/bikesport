import { dataSources } from "@/data-access/data-sources";
import type { PageRecord } from "@/interfaces/page.interface";
import { CACHE_TAG, cachedByTags } from "@/lib/cache.utils";

export async function getPublishedPages(): Promise<PageRecord[]> {
  return cachedByTags(
    ["published-pages"],
    [CACHE_TAG.pages],
    () => dataSources.page.getPublished(),
  );
}

export async function getPublishedPageByPath(path: string): Promise<PageRecord | null> {
  return cachedByTags(
    ["published-page-by-path", path],
    [CACHE_TAG.pages, CACHE_TAG.pageByPath(path)],
    () => dataSources.page.getPublishedByPath(path),
  );
}

export async function getPublishedPageBySlug(slug: string): Promise<PageRecord | null> {
  return cachedByTags(
    ["published-page-by-slug", slug],
    [CACHE_TAG.pages, CACHE_TAG.pageBySlug(slug)],
    () => dataSources.page.getPublishedBySlug(slug),
  );
}

export async function getPublishedPageSlugs(): Promise<string[]> {
  return cachedByTags(
    ["published-page-slugs"],
    [CACHE_TAG.pages],
    () => dataSources.page.getPublishedSlugs(),
  );
}
