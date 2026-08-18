"use client";

import { Children, isValidElement, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";
import { CAROUSEL_CLASS } from "@/variants/carousel.variant";

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
  const slides = Children.toArray(children);
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
    <div className={cn(CAROUSEL_CLASS.root, className)} role="region" aria-label={ariaLabel}>
      <div
        ref={emblaRef}
        className={cn(
          CAROUSEL_CLASS.viewport,
          canScroll && CAROUSEL_CLASS.viewportInteractive,
          viewportClassName,
        )}
      >
        <div
          className={cn(
            CAROUSEL_CLASS.track,
            stretchSlides ? CAROUSEL_CLASS.trackStretch : CAROUSEL_CLASS.trackStart,
            trackClassName,
          )}
        >
          {slides.map((child, index) => {
            const slideKey = isValidElement(child) && child.key !== null
              ? String(child.key)
              : `slide-${index}`;

            return (
              <div
                key={slideKey}
                className={cn(
                  CAROUSEL_CLASS.slide,
                  stretchSlides ? CAROUSEL_CLASS.slideStretch : CAROUSEL_CLASS.slideStart,
                  slideClassName,
                )}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && canScroll ? (
        <div className={cn(CAROUSEL_CLASS.arrows, arrowsClassName)}>
          <button
            type="button"
            className={CAROUSEL_CLASS.previousButton}
            aria-label={prevAriaLabel}
            onClick={scrollPrev}
          >
            <Icon name="chevron-left" size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={CAROUSEL_CLASS.nextButton}
            aria-label={nextAriaLabel}
            onClick={scrollNext}
          >
            <Icon name="chevron-right" size={18} strokeWidth={2} />
          </button>
        </div>
      ) : null}

      {canScroll ? (
        <div className={cn(CAROUSEL_CLASS.dots, dotsClassName)} aria-label="Chọn slide">
          {emblaApi?.scrollSnapList().map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={`carousel-dot-${index}`}
                type="button"
                className={cn(
                  CAROUSEL_CLASS.dot,
                  isActive ? CAROUSEL_CLASS.dotActive : CAROUSEL_CLASS.dotInactive,
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
