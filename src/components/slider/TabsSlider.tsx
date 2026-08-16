"use client";

import { useMemo, useState } from "react";
import { ProductSlider, type ProductSliderItem } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { CardTemplate } from "@/interfaces/card.interface";

export interface TabsSliderGroup extends TabItem {
  items: ProductSliderItem[];
}

interface TabsSliderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  groups: TabsSliderGroup[];
  template: CardTemplate;
  trackClassName?: string;
  slideClassName?: string;
}

export function TabsSlider({
  title,
  href,
  actionLabel,
  groups,
  template,
  trackClassName,
  slideClassName,
}: TabsSliderProps) {
  const [activeValue, setActiveValue] = useState(groups[0]?.value ?? "");
  const activeGroup = useMemo(
    () => groups.find((group) => group.value === activeValue) ?? groups[0],
    [activeValue, groups],
  );

  if (!activeGroup) return null;

  return (
    <div className="min-w-0">
      <SectionHeader title={title} href={href} actionLabel={actionLabel} className="mb-3">
        <Tabs
          items={groups.map(({ label, value }) => ({ label, value }))}
          value={activeGroup.value}
          onChange={setActiveValue}
        />
      </SectionHeader>

      <ProductSlider
        items={activeGroup.items}
        template={template}
        ariaLabel={`${title} - ${activeGroup.label}`}
        trackClassName={trackClassName}
        slideClassName={slideClassName}
      />
    </div>
  );
}
