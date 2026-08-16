import postData from "@/data/wp-posts.json";
import type { PostRecord } from "@/interfaces/post.interface";

export function getLatestPosts(limit?: number) {
  const posts = (postData.posts as PostRecord[])
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}
