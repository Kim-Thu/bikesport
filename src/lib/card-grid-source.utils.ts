import type { CardProps } from "@/interfaces/card.interface";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryById } from "@/lib/category.utils";
import {
  getActiveCombos,
  getComboDiscountPercentage,
  getComboPrimaryMediaId,
  getFeaturedCombos,
} from "@/lib/combo.utils";
import { getFeaturedEvents } from "@/lib/event.utils";
import { getLatestPosts } from "@/lib/post.utils";
import { getFeaturedStores } from "@/lib/store.utils";
import { getUserById } from "@/lib/user.utils";

export function getCardGridItems(source: CardGridBlockPayload["props"]["source"]): CardProps[] {
  if (source.type === "combo") {
    const combos = source.featured === false ? getActiveCombos(source.limit) : getFeaturedCombos(source.limit);

    return combos.map((combo) => ({
      title: combo.name,
      href: `/combo/${combo.slug}`,
      mediaId: getComboPrimaryMediaId(combo),
      description: combo.description,
      price: combo.price,
      salePrice: combo.comboPrice,
      discountPercentage: getComboDiscountPercentage(combo),
      actionLabel: "Xem combo",
    }));
  }

  if (source.type === "post") {
    return getLatestPosts(source.limit).map((post) => {
      const category = post.categoryIds[0] ? getCategoryById(post.categoryIds[0]) : null;

      return {
        title: post.title,
        href: `/blog/${post.slug}`,
        mediaId: post.mediaId,
        description: post.excerpt,
        publishedAt: post.publishedAt,
        categoryName: category?.name,
        categoryHref: category ? `/category/${category.slug}` : undefined,
        authorName: getUserById(post.authorId)?.displayName,
        actionLabel: "Xem thêm",
      };
    });
  }

  if (source.type === "store") {
    return getFeaturedStores(source.limit).map((store) => ({
      title: store.name,
      href: `/cua-hang/${store.slug}`,
      mediaId: store.mediaId,
      metaItems: [
        { icon: "location", text: store.address },
        ...(store.phone ? [{ icon: "phone", text: store.phone }] : []),
        ...(store.openingHours ? [{ icon: "clock", text: store.openingHours }] : []),
      ],
      actionLabel: "Xem cửa hàng",
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
