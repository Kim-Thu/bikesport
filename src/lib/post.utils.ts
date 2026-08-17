import { dataSources } from "@/data-access/data-sources";
import type { PostRecord } from "@/interfaces/post.interface";

export async function getLatestPosts(limit?: number): Promise<PostRecord[]> {
  return dataSources.post.getLatestPublished(limit);
}
