"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Logo } from "@/components/logo/Logo";
import menuData from "@/data/wp-menu.json";
import type { NavMenuData, NavMenuProps } from "@/interfaces/navigation.interface";

export function MobileMenu({ menuId }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menu = (menuData.menus as NavMenuData[]).find((item) => item._id === menuId);
  const items = menu?.items ?? [];

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
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

  if (!items.length) return null;

  const closeMenu = () => {
    setIsVisible(false);
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
                <Icon name="close" size={26} strokeWidth={1.8} />
              </Button>
            </div>

            <ul className="m-0 list-none p-0 pb-6">
              {items
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((item) => {
                  if (!item.label) return null;

                  return (
                    <li key={item._id} className="border-b border-gray-100">
                      <Link
                        href={item.href || "/"}
                        className={`flex min-h-12 items-center justify-between gap-2 text-sm font-semibold sm:min-h-14 ${item.highlight ? "text-red-500" : "text-gray-900"}`}
                        onClick={closeMenu}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown ? <Icon name="chevron-down" size={16} strokeWidth={2} /> : null}
                      </Link>
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
