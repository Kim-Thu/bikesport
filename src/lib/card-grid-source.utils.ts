import type { CardGridItem } from "@/interfaces/card-grid.interface";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryById, getFeaturedCategoriesByType } from "@/lib/category.utils";
import {
  getActiveCombos,
  getComboDiscountPercentage,
  getComboPrimaryMediaId,
  getFeaturedCombos,
} from "@/lib/combo.utils";
import { getFeaturedEvents } from "@/lib/event.utils";
import { getMediaByIds } from "@/lib/media.utils";
import { getLatestPosts, getLatestPostsByType } from "@/lib/post.utils";
import { formatStoreAddress, getFeaturedStores } from "@/lib/store.utils";
import { getUserById } from "@/lib/user.utils";

type CardGridSource = CardGridBlockPayload["props"]["source"];

async function resolveCategoryCards(
  source: Extract<CardGridSource, { type: "category" }>,
): Promise<CardGridItem[]> {
  const categories = await getFeaturedCategoriesByType(source.categoryType, source.limit);
  return categories.map((category) => ({
    _key: category._id,
    title: category.name,
    href: `/danh-muc/${category.slug}`,
    mediaId: category.mediaId,
  }));
}

async function resolveComboCards(
  source: Extract<CardGridSource, { type: "combo" }>,
): Promise<CardGridItem[]> {
  const combos = await (source.featured === false
    ? getActiveCombos(source.limit)
    : getFeaturedCombos(source.limit));

  return Promise.all(
    combos.map(async (combo) => ({
      _key: combo._id,
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
): Promise<CardGridItem[]> {
  const posts = source.postType
    ? await getLatestPostsByType(source.postType, source.limit)
    : await getLatestPosts(source.limit);
  const testimonialMediaIds = posts.flatMap((post) =>
    post.type === "testimonial" && post.mediaId ? [post.mediaId] : [],
  );
  const testimonialMedia = await getMediaByIds(testimonialMediaIds);
  const testimonialMediaById = new Map(testimonialMedia.map((media) => [media._id, media]));

  return Promise.all(
    posts.map(async (post) => {
      if (post.type === "recruitment" && post.recruitment) {
        const recruitment = post.recruitment;
        const deadline = formatRecruitmentDeadline(recruitment.deadline);

        return {
          _key: post._id,
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

      if (post.type === "testimonial" && post.testimonial) {
        return {
          _key: post._id,
          title: post.title,
          eyebrow: post.testimonial.role,
          href: "/tuyen-dung#cau-chuyen-bikesporter",
          mediaId: post.mediaId,
          media: post.mediaId ? testimonialMediaById.get(post.mediaId) ?? null : null,
          description: post.excerpt,
        };
      }

      const [category, author] = await Promise.all([
        post.categoryIds[0] ? getCategoryById(post.categoryIds[0]) : Promise.resolve(null),
        getUserById(post.authorId),
      ]);

      return {
        _key: post._id,
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
): Promise<CardGridItem[]> {
  const stores = await getFeaturedStores(source.limit);

  return Promise.all(
    stores.map(async (store) => ({
      _key: store._id,
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
): Promise<CardGridItem[]> {
  const events = await getFeaturedEvents(source.limit);
  return events.map((event) => ({
    _key: event._id,
    title: event.title,
    href: `/su-kien/${event.slug}`,
    mediaId: event.mediaId,
    startAt: event.startAt,
    location: event.location,
    attendees: event.attendees,
  }));
}

export async function getCardGridItems(source: CardGridSource): Promise<CardGridItem[]> {
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
