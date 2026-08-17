import { MobileMenu } from "@/components/navigation/MobileMenu";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { getMediaById } from "@/lib/media.utils";
import { getMenuById } from "@/lib/menu-data.utils";
import { getSiteOptions } from "@/lib/options.utils";

export async function MobileMenuLoader({ menuId }: NavMenuProps) {
  const [menu, options] = await Promise.all([getMenuById(menuId), getSiteOptions()]);
  if (!menu || !options) return null;

  const logoMedia = options.site.logoMediaId
    ? await getMediaById(options.site.logoMediaId)
    : null;

  return (
    <MobileMenu
      menu={menu}
      site={options.site}
      logoMedia={logoMedia}
      hotline={options.contact.hotline}
      socialItems={options.contact.social ?? []}
    />
  );
}
