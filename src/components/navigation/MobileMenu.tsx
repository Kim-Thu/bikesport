"use client";

import { Button } from "@/components/button/Button";
import { Contact } from "@/components/contact/Contact";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { Logo } from "@/components/logo/Logo";
import { MenuChildren } from "@/components/navigation/partials/MenuChildren";
import { Social } from "@/components/social/Social";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import { createMenuIndex, getMenuById, getMenuHref } from "@/lib/menu.utils";
import { useUiStore } from "@/stores/ui.store";
import { useEffect, useMemo, useState } from "react";

export function MobileMenu({ menuId }: NavMenuProps) {
  const isOpen = useUiStore((state) => state.isMobileMenuOpen);
  const openMobileMenu = useUiStore((state) => state.openMobileMenu);
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const menu = getMenuById(menuId);
  const items = menu?.items ?? [];
  const { rootItems, childrenByParentId } = useMemo(() => createMenuIndex(items), [items]);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      setExpandedItemId(null);
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsVisible(false);
        closeMobileMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        window.setTimeout(closeMobileMenu, 300);
      }
    };

    desktopQuery.addEventListener("change", handleDesktopChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      desktopQuery.removeEventListener("change", handleDesktopChange);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeMobileMenu]);

  if (!rootItems.length) return null;

  const closeMenu = () => {
    setIsVisible(false);
    setExpandedItemId(null);
    window.setTimeout(closeMobileMenu, 300);
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="icon"
        icon="menu"
        aria-label="Mở menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={openMobileMenu}
      />

      {isOpen ? (
        <div
          className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          role="presentation"
          onClick={closeMenu}
        >
          <nav
            id="mobile-navigation"
            className={`flex h-screen h-dvh w-full flex-col overflow-hidden bg-white p-4 transition-transform duration-300 ease-out sm:p-5 ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
            aria-label={menu?.name || "Điều hướng di động"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex shrink-0 items-center justify-between bg-white py-1">
              <Logo href="/" />
              <Button variant="icon" aria-label="Đóng menu" onClick={closeMenu}>
                <Icon name="close" className="h-6 w-6" strokeWidth={1.8} />
              </Button>
            </div>

            <div className="site-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
              <ul className="m-0 list-none p-0 pb-6">
                {rootItems.map((item) => {
                  if (!item.label) return null;

                  const children = childrenByParentId.get(item._id) ?? [];
                  const hasDropdown = children.length > 0 || item.hasDropdown === true;
                  const isExpanded = expandedItemId === item._id;
                  const itemClass = `flex min-h-12 w-full items-center justify-between gap-2 text-sm font-semibold sm:min-h-14 ${item.highlight ? "text-red-500" : "text-gray-900"}`;

                  return (
                    <li key={item._id} className="border-b border-gray-100">
                      {hasDropdown ? (
                        <button
                          type="button"
                          className={itemClass}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-submenu-${item._id}`}
                          onClick={() => setExpandedItemId(isExpanded ? null : item._id)}
                        >
                          <span>{item.label}</span>
                          <Icon name="chevron-down" className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} strokeWidth={2} />
                        </button>
                      ) : (
                        <CLink href={getMenuHref(item)} className={itemClass} onClick={closeMenu}>
                          <span>{item.label}</span>
                        </CLink>
                      )}

                      {children.length && isExpanded ? (
                        <MenuChildren
                          id={`mobile-submenu-${item._id}`}
                          items={children}
                          listClassName="m-0 list-none bg-gray-50 p-0"
                          itemClassName="flex min-h-11 items-center px-4 text-sm text-gray-700"
                          onItemClick={closeMenu}
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="shrink-0 space-y-4 border-t border-gray-100 bg-white pt-5">
              <Contact variant="mobile" />
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Theo dõi BikeSport</p>
                <Social />
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
