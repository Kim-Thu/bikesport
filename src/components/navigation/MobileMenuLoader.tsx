import { MobileMenu } from "@/components/navigation/MobileMenu";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { getMediaById, getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getMenuById } from "@/lib/menu-data.utils";
import { getSiteOptions } from "@/lib/options.utils";

export async function MobileMenuLoader({ menuId }: NavMenuProps) {
  const [menu, options] = await Promise.all([getMenuById(menuId), getSiteOptions()]);
  if (!menu || !options) return null;

  const menuMediaIds = menu.items.flatMap((item) => (item.mediaId ? [item.mediaId] : []));
  const [logoMedia, menuMediaById] = await Promise.all([
    options.site.logoMediaId ? getMediaById(options.site.logoMediaId) : Promise.resolve(null),
    getMediaWithFallbackByIds(menuMediaIds),
  ]);

  return (
    <MobileMenu
      menu={menu}
      site={options.site}
      logoMedia={logoMedia}
      menuMediaById={menuMediaById}
      hotline={options.contact.hotline}
      socialItems={options.contact.social ?? []}
    />
  );
}
