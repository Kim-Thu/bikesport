"use client";

import { useMemo, useState } from "react";
import { ProductSlider } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { DefaultTemplate } from "@/components/slider/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/slider/templates/FeaturedShowcaseTemplate";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";
import type { TabsSliderTemplate } from "@/variants/tabs-slider.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface TabsSliderGroup extends TabItem {
  items: ProductCollectionItem[];
}

interface TabsSliderProps extends SectionHeadingConfig {
  title: string;
  groups: TabsSliderGroup[];
  template: CardTemplate;
  tabTemplate?: TabsTemplate;
  layoutTemplate?: TabsSliderTemplate;
  actionTone?: ActionLinkTone;
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
  actionTone,
  backgroundMediaId,
  containerClassName,
  trackClassName,
  slideClassName,
}: TabsSliderProps) {
  const preferredGroup = groups.find((group) => group.status === "active") ?? groups[0];
  const [activeValue, setActiveValue] = useState(preferredGroup?.value ?? "");
  const activeGroup = useMemo(
    () => groups.find((group) => group.value === activeValue) ?? preferredGroup,
    [activeValue, groups, preferredGroup],
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
        items={groups.map(({ label, value, mediaId, status, startAt, endAt }) => ({
          label,
          value,
          mediaId,
          status,
          startAt,
          endAt,
        }))}
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
        actionTone={actionTone}
        backgroundMediaId={backgroundMediaId}
        containerClassName={containerClassName}
      />
    </div>
  );
}
