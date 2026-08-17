import { MobileMenu } from "@/components/navigation/MobileMenu";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { getMediaById, getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getMenuById } from "@/lib/menu-data.utils";
import { getSiteOptions } from "@/lib/options.utils";

export async function MobileMenuLoader({ menuId }: NavMenuProps) {
  const [menu, options] = await Promise.all([getMenuById(menuId), getSiteOptions()]);
  if (!menu || !options) return null;

  const socialItems = options.contact.social ?? [];
  const menuMediaIds = menu.items.flatMap((item) => (item.mediaId ? [item.mediaId] : []));
  const socialMediaIds = socialItems.flatMap((item) => (item.iconMediaId ? [item.iconMediaId] : []));
  const [logoMedia, menuMediaById, socialMediaById] = await Promise.all([
    options.site.logoMediaId ? getMediaById(options.site.logoMediaId) : Promise.resolve(null),
    getMediaWithFallbackByIds(menuMediaIds),
    getMediaWithFallbackByIds(socialMediaIds),
  ]);

  return (
    <MobileMenu
      menu={menu}
      site={options.site}
      logoMedia={logoMedia}
      menuMediaById={menuMediaById}
      hotline={options.contact.hotline}
      socialItems={socialItems}
      socialMediaById={socialMediaById}
    />
  );
}
