import { dataSources } from "@/data-access/data-sources";
import type { NavMenuData, NavMenuItem } from "@/interfaces/navigation.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";
import { getActiveBrands, getFeaturedBrands } from "@/lib/brand.utils";

async function resolveSourceItems(item: NavMenuItem): Promise<NavMenuItem[]> {
  if (item.source?.type !== "brand") return [];

  const brands = item.source.featured === true
    ? await getFeaturedBrands(item.source.limit)
    : await getActiveBrands(item.source.limit);

  return brands.map((brand, index) => ({
    _id: `menu-brand-${brand._id}`,
    label: brand.name,
    href: `/thuong-hieu/${brand.slug}`,
    mediaId: brand.logoMediaId ?? undefined,
    display: item.source?.display ?? "image-text",
    parentId: item._id,
    order: brand.order ?? index + 1,
  }));
}

async function resolveMenu(menu: NavMenuData): Promise<NavMenuData> {
  const sourceGroups = await Promise.all(menu.items.map(resolveSourceItems));
  const sourceItems = sourceGroups.flat();
  return sourceItems.length ? { ...menu, items: [...menu.items, ...sourceItems] } : menu;
}

export async function getMenuById(menuId: string): Promise<NavMenuData | null> {
  return cachedDomain(
    "menu",
    ["resolved-by-id", menuId],
    async () => {
      const menu = await dataSources.menu.getById(menuId);
      return menu ? resolveMenu(menu) : null;
    },
    [CACHE_TAG.entity("menu", menuId), CACHE_TAG.domain("brand")],
  );
}
