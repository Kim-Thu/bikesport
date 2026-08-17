"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, PointerEvent, WheelEvent } from "react";
import { DefaultTemplate } from "@/components/tabs/templates/DefaultTemplate";
import { FeaturedTemplate } from "@/components/tabs/templates/FeaturedTemplate";
import { ImageTemplate } from "@/components/tabs/templates/ImageTemplate";
import type { TabItem, TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";
import type { TabsTemplate } from "@/variants/tabs.variant";

export type { TabItem } from "@/interfaces/tabs.interface";

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  template?: TabsTemplate;
}

const TAB_TEMPLATES: Record<TabsTemplate, ComponentType<TabTemplateProps>> = {
  default: DefaultTemplate,
  image: ImageTemplate,
  featured: FeaturedTemplate,
};

const TEMPLATE_GAPS: Record<TabsTemplate, string> = {
  default: "gap-5",
  image: "gap-3",
  featured: "gap-2",
};

const DRAG_THRESHOLD = 4;
const SCROLL_PADDING = 12;

export function Tabs({ items, value, onChange, className, template = "default" }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const Template = TAB_TEMPLATES[template];

  useEffect(() => {
    const container = containerRef.current;
    const activeTab = container?.querySelector<HTMLElement>(`[data-tab-value="${CSS.escape(value)}"]`);
    if (!container || !activeTab) return;

    const tabLeft = activeTab.offsetLeft;
    const tabRight = tabLeft + activeTab.offsetWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = visibleLeft + container.clientWidth;

    if (tabLeft < visibleLeft + SCROLL_PADDING) {
      container.scrollTo({ left: Math.max(0, tabLeft - SCROLL_PADDING), behavior: "smooth" });
    } else if (tabRight > visibleRight - SCROLL_PADDING) {
      container.scrollTo({
        left: tabRight - container.clientWidth + SCROLL_PADDING,
        behavior: "smooth",
      });
    }
  }, [value]);

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const container = containerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta) return;

    event.preventDefault();
    container.scrollLeft += delta;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || event.button !== 0) return;

    const container = containerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
    };
    container.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    const drag = dragRef.current;
    if (!container || !drag.active || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > DRAG_THRESHOLD) drag.moved = true;
    container.scrollLeft = drag.startScrollLeft - distance;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    suppressClickRef.current = drag.moved;
    drag.active = false;
    setIsDragging(false);

    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  }

  function handleTabClick(itemValue: string) {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onChange(itemValue);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scrollbar-none flex min-w-0 items-center overflow-x-auto overscroll-x-contain scroll-smooth select-none",
        TEMPLATE_GAPS[template],
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      role="tablist"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {items.map((item) => (
        <Template
          key={item.value}
          item={item}
          active={item.value === value}
          onClick={() => handleTabClick(item.value)}
        />
      ))}
    </div>
  );
}
