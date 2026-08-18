import type { CardGridItem } from "@/interfaces/card-grid.interface";
import type { PostRecord, PostSearchResult } from "@/interfaces/post.interface";
import {
  getPublishedPostBySlugAndType,
  searchPublishedPosts,
} from "@/lib/post.utils";

export const RECRUITMENT_PAGE_SIZE = 6;

export function formatRecruitmentDeadline(deadline?: string): string | undefined {
  if (!deadline) return undefined;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return undefined;

  return `Hạn ${new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)}`;
}

export function mapRecruitmentPostToCard(post: PostRecord): CardGridItem {
  const recruitment = post.recruitment;
  if (!recruitment) {
    return {
      _key: post._id,
      title: post.title,
      href: `/tuyen-dung/${post.slug}`,
      description: post.excerpt,
    };
  }

  const deadline = formatRecruitmentDeadline(recruitment.deadline);

  return {
    _key: post._id,
    title: post.title,
    eyebrow: recruitment.department,
    icon: "users",
    href: `/tuyen-dung/${post.slug}`,
    description: post.excerpt,
    metaItems: [
      { icon: "location", text: recruitment.location },
      { icon: "clock", text: recruitment.employmentType },
      ...(recruitment.salary ? [{ icon: "payment", text: recruitment.salary }] : []),
      ...(deadline ? [{ icon: "clock", text: deadline }] : []),
      ...(typeof recruitment.openings === "number"
        ? [{ icon: "users", text: `${recruitment.openings} vị trí` }]
        : []),
    ],
    actionLabel: "Xem chi tiết",
  };
}

export async function searchRecruitments(
  query: string,
  page: number,
  pageSize = RECRUITMENT_PAGE_SIZE,
): Promise<PostSearchResult> {
  return searchPublishedPosts({
    type: "recruitment",
    query,
    offset: Math.max(0, page - 1) * pageSize,
    limit: pageSize,
  });
}

export async function getRecruitmentBySlug(slug: string): Promise<PostRecord | null> {
  return getPublishedPostBySlugAndType(slug, "recruitment");
}
