"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Logo } from "@/components/logo/Logo";
import type { NavMenuProps } from "@/interfaces/navigation.interface";
import {
  getChildMenuItems,
  getMenuById,
  getMenuHref,
  getRootMenuItems,
  hasMenuChildren,
} from "@/lib/menu.utils";

export function MobileMenu({ menuId }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const menu = getMenuById(menuId);
  const items = menu?.items ?? [];
  const rootItems = getRootMenuItems(items);

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
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        window.setTimeout(() => setIsOpen(false), 300);
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
  }, [isOpen]);

  if (!rootItems.length) return null;

  const closeMenu = () => {
    setIsVisible(false);
    setExpandedItemId(null);
    window.setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="icon"
        icon="menu"
        aria-label="Mở menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
      />

      {isOpen ? (
        <div
          className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          role="presentation"
          onClick={closeMenu}
        >
          <nav
            id="mobile-navigation"
            className={`h-screen h-dvh w-full overflow-y-auto overscroll-contain bg-white p-4 transition-transform duration-300 ease-out sm:p-5 ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
            aria-label={menu?.name || "Điều hướng di động"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 mb-4 flex items-center justify-between bg-white py-1">
              <Logo href="/" />
              <Button variant="icon" aria-label="Đóng menu" onClick={closeMenu}>
                <Icon name="close" className="h-6 w-6" strokeWidth={1.8} />
              </Button>
            </div>

            <ul className="m-0 list-none p-0 pb-6">
              {rootItems.map((item) => {
                if (!item.label) return null;

                const children = getChildMenuItems(items, item._id);
                const hasDropdown = hasMenuChildren(items, item);
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
                      <Link href={getMenuHref(item)} className={itemClass} onClick={closeMenu}>
                        <span>{item.label}</span>
                      </Link>
                    )}

                    {children.length && isExpanded ? (
                      <ul id={`mobile-submenu-${item._id}`} className="m-0 list-none bg-gray-50 p-0">
                        {children.map((child) => (
                          <li key={child._id}>
                            <Link href={getMenuHref(child)} className="flex min-h-11 items-center px-4 text-sm text-gray-700" onClick={closeMenu}>
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
        </div>
      ) : null}
    </div>
  );
}
