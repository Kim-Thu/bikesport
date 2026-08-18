import { dataSources } from "@/data-access/data-sources";
import type { PostRecord } from "@/interfaces/post.interface";
import { cachedDomain } from "@/lib/cache.utils";

export async function getLatestPosts(limit?: number): Promise<PostRecord[]> {
  return cachedDomain(
    "post",
    ["latest-published", String(limit ?? "all")],
    () => dataSources.post.getLatestPublished(limit),
  );
}
