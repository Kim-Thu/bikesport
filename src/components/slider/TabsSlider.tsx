"use client";

import { useMemo, useState } from "react";
import { ProductSlider, type ProductSliderItem } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface TabsSliderGroup extends TabItem {
  items: ProductSliderItem[];
}

interface TabsSliderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  groups: TabsSliderGroup[];
  template: CardTemplate;
  tabTemplate?: TabsTemplate;
  trackClassName?: string;
  slideClassName?: string;
}

export function TabsSlider({
  title,
  href,
  actionLabel,
  groups,
  template,
  tabTemplate = "default",
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
          items={groups.map(({ label, value, mediaId }) => ({ label, value, mediaId }))}
          value={activeGroup.value}
          onChange={setActiveValue}
          template={tabTemplate}
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
