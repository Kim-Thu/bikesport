import { dataSources } from "@/data-access/data-sources";
import type {
  PostRecord,
  PostSearchQuery,
  PostSearchResult,
  PostType,
} from "@/interfaces/post.interface";
import { cachedDomain } from "@/lib/cache.utils";

export async function getLatestPosts(limit?: number): Promise<PostRecord[]> {
  return getLatestPostsByType("article", limit);
}

export async function getLatestPostsByType(type: PostType, limit?: number): Promise<PostRecord[]> {
  return cachedDomain(
    "post",
    ["latest-published-by-type", type, String(limit ?? "all")],
    () => dataSources.post.getLatestPublishedByType(type, limit),
  );
}

export async function getPublishedPostBySlugAndType(
  slug: string,
  type: PostType,
): Promise<PostRecord | null> {
  return cachedDomain(
    "post",
    ["published-by-slug-and-type", type, slug],
    () => dataSources.post.getPublishedBySlugAndType(slug, type),
  );
}

export async function searchPublishedPosts(query: PostSearchQuery): Promise<PostSearchResult> {
  const normalizedQuery = query.query?.trim() ?? "";
  const offset = Math.max(0, query.offset ?? 0);
  const limit = Math.max(1, query.limit ?? 6);

  return cachedDomain(
    "post",
    ["search-published", query.type, normalizedQuery, String(offset), String(limit)],
    () => dataSources.post.searchPublished({
      type: query.type,
      query: normalizedQuery,
      offset,
      limit,
    }),
  );
}
