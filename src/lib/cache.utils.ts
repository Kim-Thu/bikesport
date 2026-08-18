import { revalidateTag, unstable_cache } from "next/cache";

export const CACHE_TAG = {
  pages: "pages",
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

export function invalidatePagesCache() {
  revalidateTag(CACHE_TAG.pages);
}

export function invalidatePageCache(input: { slug?: string; path?: string }) {
  revalidateTag(CACHE_TAG.pages);

  if (input.slug) {
    revalidateTag(CACHE_TAG.pageBySlug(input.slug));
  }

  if (input.path) {
    revalidateTag(CACHE_TAG.pageByPath(input.path));
  }
}