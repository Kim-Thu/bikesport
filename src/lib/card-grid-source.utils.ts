import type { CardProps } from "@/interfaces/card.interface";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryById } from "@/lib/category.utils";
import { getFeaturedEvents } from "@/lib/event.utils";
import { getLatestPosts } from "@/lib/post.utils";
import { getUserById } from "@/lib/user.utils";

export function getCardGridItems(source: CardGridBlockPayload["props"]["source"]): CardProps[] {
  if (source.type === "post") {
    return getLatestPosts(source.limit).map((post) => ({
      title: post.title,
      href: `/blog/${post.slug}`,
      mediaId: post.mediaId,
      publishedAt: post.publishedAt,
      categoryName: post.categoryIds[0] ? getCategoryById(post.categoryIds[0])?.name : undefined,
      authorName: getUserById(post.authorId)?.displayName,
    }));
  }

  return getFeaturedEvents(source.limit).map((event) => ({
    title: event.title,
    href: `/su-kien/${event.slug}`,
    mediaId: event.mediaId,
    startAt: event.startAt,
    location: event.location,
    attendees: event.attendees,
  }));
}
