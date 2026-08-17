"use client";

import { useMemo, useState } from "react";
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
}

export function TabsGrid({
  title,
  href,
  actionLabel,
  groups,
  template,
  gridClassName,
}: TabsGridProps) {
  const [activeValue, setActiveValue] = useState(groups[0]?.value ?? "");
  const activeGroup = useMemo(
    () => groups.find((group) => group.value === activeValue) ?? groups[0],
    [activeValue, groups],
  );

  if (!activeGroup) return null;

  return (
    <div className="min-w-0">
      <SectionHeader title={title} href={href} actionLabel={actionLabel} className="mb-4">
        <Tabs
          items={groups.map(({ label, value }) => ({ label, value }))}
          value={activeGroup.value}
          onChange={setActiveValue}
        />
      </SectionHeader>

      <ProductGrid items={activeGroup.items} template={template} className={gridClassName} />
    </div>
  );
}
