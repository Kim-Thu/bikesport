"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { PaginationVariant } from "@/variants/pagination.variant";

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
  paginationVariant?: PaginationVariant;
}

export function TabsGrid({
  title,
  href,
  actionLabel,
  groups,
  template,
  gridClassName,
  mobilePageSize = 4,
  paginationVariant = "default",
}: TabsGridProps) {
  const [activeValue, setActiveValue] = useState(groups[0]?.value ?? "");
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionStartRef = useRef<HTMLDivElement>(null);

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

  function scrollToSectionStart() {
    window.requestAnimationFrame(() => {
      sectionStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleTabChange(value: string) {
    setActiveValue(value);
    setMobilePage(0);
    if (isMobile) scrollToSectionStart();
  }

  function handlePageChange(page: number) {
    setMobilePage(page);
    scrollToSectionStart();
  }

  if (!activeGroup) return null;

  const pageSize = Math.max(1, mobilePageSize);
  const totalPages = Math.max(1, Math.ceil(activeGroup.items.length / pageSize));
  const safePage = Math.min(mobilePage, totalPages - 1);
  const visibleItems = isMobile
    ? activeGroup.items.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : activeGroup.items;

  return (
    <div ref={sectionStartRef} className="min-w-0 scroll-mt-4">
      <SectionHeader title={title} href={href} actionLabel={actionLabel} className="mb-4">
        <Tabs
          items={groups.map(({ label, value }) => ({ label, value }))}
          value={activeGroup.value}
          onChange={handleTabChange}
        />
      </SectionHeader>

      <ProductGrid items={visibleItems} template={template} className={gridClassName} />

      {isMobile ? (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          ariaLabel={`Phân trang ${title}`}
          variant={paginationVariant}
          className="mt-4"
        />
      ) : null}
    </div>
  );
}
