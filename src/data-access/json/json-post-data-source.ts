import postData from "@/data/wp-posts.json";
import type { PostDataSource } from "@/data-access/contracts/post-data-source.interface";
import type { PostRecord } from "@/interfaces/post.interface";

const publishedPosts = (postData.posts as PostRecord[])
  .filter((post) => post.status === "published")
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

function normalizeSearchText(value: string): string {
  return value.toLocaleLowerCase("vi-VN").trim();
}

function matchesSearch(post: PostRecord, query: string): boolean {
  if (!query) return true;

  const recruitment = post.recruitment;
  const searchable = [
    post.title,
    post.excerpt,
    recruitment?.department,
    recruitment?.location,
    recruitment?.employmentType,
  ]
    .filter(Boolean)
    .join(" ");

  return normalizeSearchText(searchable).includes(query);
}

export const jsonPostDataSource: PostDataSource = {
  async getLatestPublished(limit) {
    return typeof limit === "number" ? publishedPosts.slice(0, limit) : publishedPosts;
  },

  async getLatestPublishedByType(type, limit) {
    const posts = publishedPosts.filter((post) => post.type === type);
    return typeof limit === "number" ? posts.slice(0, limit) : posts;
  },

  async getPublishedBySlugAndType(slug, type) {
    return publishedPosts.find((post) => post.type === type && post.slug === slug) ?? null;
  },

  async searchPublished({ type, query = "", offset = 0, limit = 6 }) {
    const normalizedQuery = normalizeSearchText(query);
    const matches = publishedPosts.filter(
      (post) => post.type === type && matchesSearch(post, normalizedQuery),
    );

    return {
      items: matches.slice(Math.max(0, offset), Math.max(0, offset) + Math.max(1, limit)),
      total: matches.length,
    };
  },
};
