"use client";

import { useMemo, useState } from "react";
import { DefaultTemplate } from "@/components/slider/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/slider/templates/FeaturedShowcaseTemplate";
import { ProductSlider, type ProductSliderItem } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { TabsSliderTemplate } from "@/variants/tabs-slider.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface TabsSliderGroup extends TabItem {
  items: ProductSliderItem[];
}

interface TabsSliderProps {
  title: string;
  titleMediaId?: string | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  groups: TabsSliderGroup[];
  template: CardTemplate;
  headingTemplate?: SectionHeaderTemplate;
  tabTemplate?: TabsTemplate;
  layoutTemplate?: TabsSliderTemplate;
  backgroundMediaId?: string | null;
  containerClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
}

const TEMPLATES = {
  default: DefaultTemplate,
  "featured-showcase": FeaturedShowcaseTemplate,
} as const;

export function TabsSlider({
  title,
  titleMediaId,
  titleAlt,
  href,
  actionLabel,
  groups,
  template,
  headingTemplate = "default",
  tabTemplate = "default",
  layoutTemplate = "default",
  backgroundMediaId,
  containerClassName,
  trackClassName,
  slideClassName,
}: TabsSliderProps) {
  const [activeValue, setActiveValue] = useState(groups[0]?.value ?? "");
  const activeGroup = useMemo(
    () => groups.find((group) => group.value === activeValue) ?? groups[0],
    [activeValue, groups],
  );

  if (!activeGroup) return null;

  const LayoutTemplate = TEMPLATES[layoutTemplate];
  const header = (
    <SectionHeader
      title={title}
      titleMediaId={titleMediaId}
      titleAlt={titleAlt}
      href={layoutTemplate === "default" ? href : undefined}
      actionLabel={actionLabel}
      template={headingTemplate}
    >
      <Tabs
        items={groups.map(({ label, value, mediaId }) => ({ label, value, mediaId }))}
        value={activeGroup.value}
        onChange={setActiveValue}
        template={tabTemplate}
      />
    </SectionHeader>
  );

  const slider = (
    <ProductSlider
      items={activeGroup.items}
      template={template}
      ariaLabel={`${title} - ${activeGroup.label}`}
      trackClassName={trackClassName}
      slideClassName={slideClassName}
    />
  );

  return (
    <div className="min-w-0">
      <LayoutTemplate
        header={header}
        slider={slider}
        href={href}
        actionLabel={actionLabel}
        backgroundMediaId={backgroundMediaId}
        containerClassName={containerClassName}
      />
    </div>
  );
}
