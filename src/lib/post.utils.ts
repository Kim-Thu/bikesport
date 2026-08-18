import { dataSources } from "@/data-access/data-sources";
import type { PostRecord, PostType } from "@/interfaces/post.interface";
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
