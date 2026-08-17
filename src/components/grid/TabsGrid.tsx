"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DefaultTemplate } from "@/components/grid/templates/DefaultTemplate";
import { FeaturedDealsTemplate } from "@/components/grid/templates/FeaturedDealsTemplate";
import { Pagination } from "@/components/pagination/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { PaginationVariant } from "@/variants/pagination.variant";
import type { TabsGridTemplate } from "@/variants/tabs-grid.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface TabsGridGroup extends TabItem {
  items: ProductSliderItem[];
}

interface TabsGridProps {
  title: string;
  titleMediaId?: string | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  groups: TabsGridGroup[];
  template: CardTemplate;
  headingTemplate?: SectionHeaderTemplate;
  tabsTemplate?: TabsTemplate;
  layoutTemplate?: TabsGridTemplate;
  backgroundMediaId?: string | null;
  gridClassName?: string;
  mobilePageSize?: number;
  paginationVariant?: PaginationVariant;
}

const TEMPLATES = {
  default: DefaultTemplate,
  "featured-deals": FeaturedDealsTemplate,
} as const;

export function TabsGrid({
  title,
  titleMediaId,
  titleAlt,
  href,
  actionLabel,
  groups,
  template,
  headingTemplate = "default",
  tabsTemplate = "default",
  layoutTemplate = "default",
  backgroundMediaId,
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
  const LayoutTemplate = TEMPLATES[layoutTemplate];

  const header = (
    <SectionHeader
      title={title}
      titleMediaId={titleMediaId}
      titleAlt={titleAlt}
      href={href}
      actionLabel={actionLabel}
      template={headingTemplate}
      className={layoutTemplate === "default" ? "mb-4" : undefined}
    >
      <Tabs
        items={groups.map(({ label, value, mediaId }) => ({ label, value, mediaId }))}
        value={activeGroup.value}
        onChange={handleTabChange}
        template={tabsTemplate}
      />
    </SectionHeader>
  );

  const grid = <ProductGrid items={visibleItems} template={template} className={gridClassName} />;
  const pagination = isMobile ? (
    <Pagination
      page={safePage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      ariaLabel={`Phân trang ${title}`}
      variant={paginationVariant}
      className="mt-4"
    />
  ) : undefined;

  return (
    <div ref={sectionStartRef} className="min-w-0 scroll-mt-8 sm:scroll-mt-6">
      <LayoutTemplate
        header={header}
        grid={grid}
        pagination={pagination}
        href={href}
        actionLabel={actionLabel}
        backgroundMediaId={backgroundMediaId}
      />
    </div>
  );
}
