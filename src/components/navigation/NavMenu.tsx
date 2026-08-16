import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import menuData from "@/data/wp-menu.json";
import type { NavMenuData, NavMenuProps } from "@/interfaces/navigation.interface";

export function NavMenu({ menuId }: NavMenuProps) {
  const menu = (menuData.menus as NavMenuData[]).find((item) => item._id === menuId);
  const items = menu?.items ?? [];

  if (!items.length) return null;

  return (
    <nav className="hidden w-full overflow-x-auto bg-white lg:block" aria-label={menu?.name || "Điều hướng"}>
      <ul className="flex min-h-12 min-w-max list-none items-center gap-5 p-0 xl:gap-8 2xl:gap-10">
        {items
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((item) => {
            if (!item.label) return null;

            return (
              <li key={item._id}>
                <Link href={item.href || "/"} className={`inline-flex min-h-12 items-center gap-1 whitespace-nowrap text-xs font-bold tracking-wide ${item.highlight ? "text-red-500" : "text-gray-900"}`}>
                  <span>{item.label}</span>
                  {item.hasDropdown ? <Icon name="chevron-down" size={13} strokeWidth={2} /> : null}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
