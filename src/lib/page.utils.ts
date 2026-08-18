import { dataSources } from "@/data-access/data-sources";
import type { PageRecord } from "@/interfaces/page.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

export async function getPublishedPages(): Promise<PageRecord[]> {
  return cachedDomain(
    "page",
    ["published-pages"],
    () => dataSources.page.getPublished(),
  );
}

export async function getPublishedPageByPath(path: string): Promise<PageRecord | null> {
  return cachedDomain(
    "page",
    ["published-page-by-path", path],
    () => dataSources.page.getPublishedByPath(path),
    [CACHE_TAG.pageByPath(path)],
  );
}

export async function getPublishedPageBySlug(slug: string): Promise<PageRecord | null> {
  return cachedDomain(
    "page",
    ["published-page-by-slug", slug],
    () => dataSources.page.getPublishedBySlug(slug),
    [CACHE_TAG.pageBySlug(slug)],
  );
}

export async function getPublishedPageSlugs(): Promise<string[]> {
  return cachedDomain(
    "page",
    ["published-page-slugs"],
    () => dataSources.page.getPublishedSlugs(),
  );
}
