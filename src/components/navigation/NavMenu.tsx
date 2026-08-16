import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import menuData from "@/data/wp-menu.json";
import type { NavMenuData, NavMenuItem, NavMenuProps } from "@/interfaces/navigation.interface";

function sortItems(items: NavMenuItem[]) {
  return items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function NavMenu({ menuId }: NavMenuProps) {
  const menu = (menuData.menus as NavMenuData[]).find((item) => item._id === menuId);
  const items = menu?.items ?? [];
  const rootItems = sortItems(items.filter((item) => !item.parentId));

  if (!rootItems.length) return null;

  return (
    <nav className="hidden w-full bg-white lg:block" aria-label={menu?.name || "Điều hướng"}>
      <ul className="flex min-h-12 list-none items-center gap-5 p-0 xl:gap-8 2xl:gap-10">
        {rootItems.map((item) => {
          if (!item.label) return null;

          const children = sortItems(items.filter((child) => child.parentId === item._id));
          const hasDropdown = children.length > 0 || item.hasDropdown;

          return (
            <li key={item._id} className="group relative">
              <Link
                href={item.href || "/"}
                className={`inline-flex min-h-12 items-center gap-1 whitespace-nowrap text-xs font-bold tracking-wide ${item.highlight ? "text-red-500" : "text-gray-900"}`}
              >
                <span>{item.label}</span>
                {hasDropdown ? <Icon name="chevron-down" className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" strokeWidth={2} /> : null}
              </Link>

              {children.length ? (
                <ul className="invisible absolute left-0 top-full z-50 min-w-56 list-none border border-gray-100 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {children.map((child) => (
                    <li key={child._id}>
                      <Link href={child.href || "/"} className="flex min-h-10 items-center whitespace-nowrap px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 focus:bg-gray-50 focus:text-blue-600">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
