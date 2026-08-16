"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/classname.utils";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  viewportClassName?: string;
  dotsClassName?: string;
  ariaLabel?: string;
  loop?: boolean;
  dragFree?: boolean;
}

export function Carousel({
  children,
  className,
  viewportClassName,
  dotsClassName,
  ariaLabel = "Carousel",
  loop = false,
  dragFree = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const syncSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    syncSelectedIndex();
    emblaApi.on("select", syncSelectedIndex);
    emblaApi.on("reInit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", syncSelectedIndex);
      emblaApi.off("reInit", syncSelectedIndex);
    };
  }, [emblaApi, syncSelectedIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={emblaRef}
        className={cn("cursor-grab overflow-hidden active:cursor-grabbing", viewportClassName)}
      >
        <div className="flex touch-pan-y items-stretch">
          {children.map((child, index) => (
            <div key={index} className="flex min-w-0 flex-[0_0_100%] self-stretch">
              {child}
            </div>
          ))}
        </div>
      </div>

      {children.length > 1 ? (
        <div
          className={cn(
            "absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2",
            dotsClassName,
          )}
          aria-label="Chọn slide"
        >
          {children.map((_, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                type="button"
                className={cn(
                  "block h-1.5 cursor-pointer rounded-full bg-white/70 transition-[width,opacity]",
                  isActive ? "w-8 bg-white" : "w-1.5",
                )}
                aria-label={`Chuyển đến slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
