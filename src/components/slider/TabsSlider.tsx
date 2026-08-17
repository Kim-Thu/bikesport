"use client";

import { useMemo, useState } from "react";
import { ProductSlider } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { DefaultTemplate } from "@/components/slider/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/slider/templates/FeaturedShowcaseTemplate";
import { Tabs } from "@/components/tabs/Tabs";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { MediaItem } from "@/interfaces/media.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";
import type { TabsSliderGroup } from "@/interfaces/tabs-slider.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";
import type { TabsSliderTemplate } from "@/variants/tabs-slider.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export type { TabsSliderGroup } from "@/interfaces/tabs-slider.interface";

interface TabsSliderProps extends SectionHeadingConfig {
  title: string;
  groups: TabsSliderGroup[];
  template: CardTemplate;
  tabTemplate?: TabsTemplate;
  layoutTemplate?: TabsSliderTemplate;
  actionTone?: ActionLinkTone;
  titleMedia?: MediaItem | null;
  backgroundMedia?: MediaItem | null;
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
  titleMedia,
  titleAlt,
  href,
  actionLabel,
  groups,
  template,
  headingTemplate = "default",
  tabTemplate = "default",
  layoutTemplate = "default",
  actionTone,
  backgroundMedia,
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
      titleMedia={titleMedia}
      titleAlt={titleAlt}
      href={layoutTemplate === "default" ? href : undefined}
      actionLabel={actionLabel}
      template={headingTemplate}
    >
      <Tabs
        items={groups.map(({ label, value, mediaId, media, status, startAt, endAt }) => ({
          label,
          value,
          mediaId,
          media,
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
        backgroundMedia={backgroundMedia}
        containerClassName={containerClassName}
      />
    </div>
  );
}
