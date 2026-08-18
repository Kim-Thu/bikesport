import type { CardProps } from "@/interfaces/card.interface";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryById, getFeaturedCategoriesByType } from "@/lib/category.utils";
import {
  getActiveCombos,
  getComboDiscountPercentage,
  getComboPrimaryMediaId,
  getFeaturedCombos,
} from "@/lib/combo.utils";
import { getFeaturedEvents } from "@/lib/event.utils";
import { getLatestPosts, getLatestPostsByType } from "@/lib/post.utils";
import { formatStoreAddress, getFeaturedStores } from "@/lib/store.utils";
import { getUserById } from "@/lib/user.utils";

type CardGridSource = CardGridBlockPayload["props"]["source"];

async function resolveCategoryCards(
  source: Extract<CardGridSource, { type: "category" }>,
): Promise<CardProps[]> {
  const categories = await getFeaturedCategoriesByType(source.categoryType, source.limit);
  return categories.map((category) => ({
    title: category.name,
    href: `/danh-muc/${category.slug}`,
    mediaId: category.mediaId,
  }));
}

async function resolveComboCards(
  source: Extract<CardGridSource, { type: "combo" }>,
): Promise<CardProps[]> {
  const combos = await (source.featured === false
    ? getActiveCombos(source.limit)
    : getFeaturedCombos(source.limit));

  return Promise.all(
    combos.map(async (combo) => ({
      title: combo.name,
      href: `/combo/${combo.slug}`,
      mediaId: await getComboPrimaryMediaId(combo),
      description: combo.description,
      price: combo.price,
      salePrice: combo.comboPrice,
      discountPercentage: getComboDiscountPercentage(combo),
      actionLabel: "Xem combo",
    })),
  );
}

function formatRecruitmentDeadline(deadline?: string): string | undefined {
  if (!deadline) return undefined;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return undefined;

  return `Hạn ${new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)}`;
}

async function resolvePostCards(
  source: Extract<CardGridSource, { type: "post" }>,
): Promise<CardProps[]> {
  const posts = source.postType
    ? await getLatestPostsByType(source.postType, source.limit)
    : await getLatestPosts(source.limit);

  return Promise.all(
    posts.map(async (post) => {
      if (post.type === "recruitment" && post.recruitment) {
        const recruitment = post.recruitment;
        const deadline = formatRecruitmentDeadline(recruitment.deadline);

        return {
          title: post.title,
          eyebrow: recruitment.department,
          icon: "users",
          href: recruitment.applyUrl ?? "/lien-he",
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
          actionLabel: "Ứng tuyển",
        };
      }

      const [category, author] = await Promise.all([
        post.categoryIds[0] ? getCategoryById(post.categoryIds[0]) : Promise.resolve(null),
        getUserById(post.authorId),
      ]);

      return {
        title: post.title,
        href: `/blog/${post.slug}`,
        mediaId: post.mediaId,
        description: post.excerpt,
        publishedAt: post.publishedAt,
        categoryName: category?.name,
        categoryHref: category ? `/category/${category.slug}` : undefined,
        authorName: author?.displayName,
        actionLabel: "Xem thêm",
      };
    }),
  );
}

async function resolveStoreCards(
  source: Extract<CardGridSource, { type: "store" }>,
): Promise<CardProps[]> {
  const stores = await getFeaturedStores(source.limit);

  return Promise.all(
    stores.map(async (store) => ({
      title: store.name,
      href: `/cua-hang/${store.slug}`,
      mediaId: store.mediaId,
      metaItems: [
        { icon: "location", text: await formatStoreAddress(store) },
        ...(store.phone ? [{ icon: "phone", text: store.phone }] : []),
        ...(store.openingHours ? [{ icon: "clock", text: store.openingHours }] : []),
      ],
      actionLabel: "Xem cửa hàng",
    })),
  );
}

async function resolveEventCards(
  source: Extract<CardGridSource, { type: "event" }>,
): Promise<CardProps[]> {
  const events = await getFeaturedEvents(source.limit);
  return events.map((event) => ({
    title: event.title,
    href: `/su-kien/${event.slug}`,
    mediaId: event.mediaId,
    startAt: event.startAt,
    location: event.location,
    attendees: event.attendees,
  }));
}

export async function getCardGridItems(source: CardGridSource): Promise<CardProps[]> {
  switch (source.type) {
    case "category":
      return resolveCategoryCards(source);
    case "combo":
      return resolveComboCards(source);
    case "post":
      return resolvePostCards(source);
    case "store":
      return resolveStoreCards(source);
    case "event":
      return resolveEventCards(source);
  }
}
