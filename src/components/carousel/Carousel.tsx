"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  arrowsClassName?: string;
  ariaLabel?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  loop?: boolean;
  dragFree?: boolean;
  showArrows?: boolean;
  stretchSlides?: boolean;
}

export function Carousel({
  children,
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  dotsClassName,
  arrowsClassName,
  ariaLabel = "Carousel",
  prevAriaLabel = "Slide trước",
  nextAriaLabel = "Slide tiếp theo",
  loop = false,
  dragFree = false,
  showArrows = false,
  stretchSlides = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanScroll(emblaApi.scrollSnapList().length > 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const initialFrame = window.requestAnimationFrame(syncCarouselState);
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  const scrollToIndex = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={emblaRef}
        className={cn(
          "overflow-hidden",
          canScroll && "cursor-grab active:cursor-grabbing",
          viewportClassName,
        )}
      >
        <div className={cn("flex touch-pan-y", stretchSlides ? "items-stretch" : "items-start", trackClassName)}>
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex min-w-0 grow-0 shrink-0 basis-full",
                stretchSlides ? "self-stretch [&>*]:w-full" : "self-start",
                slideClassName,
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && canScroll ? (
        <div className={cn("pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between", arrowsClassName)}>
          <button type="button" className="pointer-events-auto ml-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-700" aria-label={prevAriaLabel} onClick={scrollPrev}>
            <Icon name="chevron-left" size={18} strokeWidth={2} />
          </button>
          <button type="button" className="pointer-events-auto mr-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-700" aria-label={nextAriaLabel} onClick={scrollNext}>
            <Icon name="chevron-right" size={18} strokeWidth={2} />
          </button>
        </div>
      ) : null}

      {canScroll ? (
        <div className={cn("absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2", dotsClassName)} aria-label="Chọn slide">
          {emblaApi?.scrollSnapList().map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                type="button"
                className={cn("block h-1.5 cursor-pointer rounded-full bg-white/70 transition-all", isActive ? "w-8 bg-white" : "w-1.5")}
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
