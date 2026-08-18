import { revalidateTag, unstable_cache } from "next/cache";
import type { DataSources } from "@/data-access/contracts/data-sources.interface";

export type CacheDomain = keyof DataSources;

export const CACHE_TAG = {
  domain: (domain: CacheDomain) => `domain:${domain}`,
  entity: (domain: CacheDomain, id: string) => `domain:${domain}:id:${id}`,
  pageBySlug: (slug: string) => `page:slug:${slug}`,
  pageByPath: (path: string) => `page:path:${path}`,
} as const;

export function cachedByTags<T>(
  keyParts: string[],
  tags: string[],
  loader: () => Promise<T>,
): Promise<T> {
  return unstable_cache(loader, keyParts, { tags })();
}

export function cachedDomain<T>(
  domain: CacheDomain,
  keyParts: string[],
  loader: () => Promise<T>,
  extraTags: string[] = [],
): Promise<T> {
  return cachedByTags(
    [domain, ...keyParts],
    [CACHE_TAG.domain(domain), ...extraTags],
    loader,
  );
}

function revalidateContentTag(tag: string) {
  revalidateTag(tag, "max");
}

export function invalidateDomainCache(domain: CacheDomain) {
  revalidateContentTag(CACHE_TAG.domain(domain));
}

export function invalidateEntityCache(domain: CacheDomain, id: string) {
  revalidateContentTag(CACHE_TAG.domain(domain));
  revalidateContentTag(CACHE_TAG.entity(domain, id));
}

export function invalidatePagesCache() {
  invalidateDomainCache("page");
}

export function invalidatePageCache(input: { slug?: string; path?: string }) {
  invalidateDomainCache("page");

  if (input.slug) {
    revalidateContentTag(CACHE_TAG.pageBySlug(input.slug));
  }

  if (input.path) {
    revalidateContentTag(CACHE_TAG.pageByPath(input.path));
  }
}
