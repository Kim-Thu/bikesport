import { MobileMenu } from "@/components/navigation/MobileMenu";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { getMenuById } from "@/lib/menu-data.utils";

export async function MobileMenuLoader({ menuId }: NavMenuProps) {
  const menu = await getMenuById(menuId);
  if (!menu) return null;

  return <MobileMenu menu={menu} />;
}
