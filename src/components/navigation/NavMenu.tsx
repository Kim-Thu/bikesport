import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MenuChildren } from "@/components/navigation/partials/MenuChildren";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { createMenuIndex, getMenuById, getMenuHref } from "@/lib/menu.utils";

export function NavMenu({ menuId }: NavMenuProps) {
  const menu = getMenuById(menuId);
  const items = menu?.items ?? [];
  const { rootItems, childrenByParentId } = createMenuIndex(items);

  if (!rootItems.length) return null;

  return (
    <nav className="hidden w-full bg-white lg:block" aria-label={menu?.name || "Điều hướng"}>
      <ul className="flex min-h-12 list-none items-center gap-5 p-0 xl:gap-8 2xl:gap-10">
        {rootItems.map((item) => {
          if (!item.label) return null;

          const children = childrenByParentId.get(item._id) ?? [];
          const hasDropdown = children.length > 0 || item.hasDropdown === true;

          return (
            <li key={item._id} className="group relative">
              <CLink
                href={getMenuHref(item)}
                className={`inline-flex min-h-12 items-center gap-1 whitespace-nowrap text-xs font-bold tracking-wide ${item.highlight ? "text-red-500" : "text-gray-900"}`}
              >
                <span>{item.label}</span>
                {hasDropdown ? <Icon name="chevron-down" className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" strokeWidth={2} /> : null}
              </CLink>

              {children.length ? (
                <MenuChildren
                  items={children}
                  listClassName="invisible absolute left-0 top-full z-50 min-w-56 list-none border border-gray-100 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  itemClassName="flex min-h-10 items-center whitespace-nowrap px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 focus:bg-gray-50 focus:text-blue-600"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
