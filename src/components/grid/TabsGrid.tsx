"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { CardTemplate } from "@/interfaces/card.interface";

export interface TabsGridGroup extends TabItem {
  items: ProductSliderItem[];
}

interface TabsGridProps {
  title: string;
  href?: string;
  actionLabel?: string;
  groups: TabsGridGroup[];
  template: CardTemplate;
  gridClassName?: string;
  mobilePageSize?: number;
}

export function TabsGrid({
  title,
  href,
  actionLabel,
  groups,
  template,
  gridClassName,
  mobilePageSize = 4,
}: TabsGridProps) {
  const [activeValue, setActiveValue] = useState(groups[0]?.value ?? "");
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeGroup = useMemo(
    () => groups.find((group) => group.value === activeValue) ?? groups[0],
    [activeValue, groups],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    setMobilePage(0);
  }, [activeValue]);

  if (!activeGroup) return null;

  const pageSize = Math.max(1, mobilePageSize);
  const totalPages = Math.max(1, Math.ceil(activeGroup.items.length / pageSize));
  const safePage = Math.min(mobilePage, totalPages - 1);
  const visibleItems = isMobile
    ? activeGroup.items.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : activeGroup.items;

  return (
    <div className="min-w-0">
      <SectionHeader title={title} href={href} actionLabel={actionLabel} className="mb-4">
        <Tabs
          items={groups.map(({ label, value }) => ({ label, value }))}
          value={activeGroup.value}
          onChange={setActiveValue}
        />
      </SectionHeader>

      <ProductGrid items={visibleItems} template={template} className={gridClassName} />

      {isMobile && totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3" aria-label={`Phân trang ${title}`}>
          <button
            type="button"
            className="cursor-pointer rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={safePage === 0}
            onClick={() => setMobilePage((page) => Math.max(0, page - 1))}
          >
            Trước
          </button>
          <span className="text-sm font-medium text-gray-600">
            {safePage + 1} / {totalPages}
          </span>
          <button
            type="button"
            className="cursor-pointer rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={safePage >= totalPages - 1}
            onClick={() => setMobilePage((page) => Math.min(totalPages - 1, page + 1))}
          >
            Sau
          </button>
        </div>
      ) : null}
    </div>
  );
}
