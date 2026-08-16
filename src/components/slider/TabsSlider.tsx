"use client";

import { useMemo, useState } from "react";
import { CardSlider, type CardSliderItem } from "@/components/slider/CardSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { Tabs, type TabItem } from "@/components/tabs/Tabs";

export interface TabsSliderGroup extends TabItem {
  items: CardSliderItem[];
}

interface TabsSliderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  groups: TabsSliderGroup[];
}

export function TabsSlider({ title, href, actionLabel, groups }: TabsSliderProps) {
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

      <CardSlider items={activeGroup.items} ariaLabel={`${title} - ${activeGroup.label}`} />
    </div>
  );
}
