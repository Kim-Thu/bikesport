import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

export interface ProductSliderItem extends Omit<CardProps, "template"> {
  _key: string;
}

interface ProductSliderProps {
  items: ProductSliderItem[];
  template: CardTemplate;
  ariaLabel: string;
  slideClassName?: string;
}

export function ProductSlider({
  items,
  template,
  ariaLabel,
  slideClassName,
}: ProductSliderProps) {
  if (!items.length) return null;

  const repeatCount = Math.max(1, Math.ceil(10 / items.length));
  const slides = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <Carousel
      loop
      dragFree
      showArrows
      ariaLabel={ariaLabel}
      slideClassName={slideClassName}
      dotsClassName="hidden"
    >
      {slides.map(({ _key, ...item }, index) => (
        <Card key={`${_key}-${index}`} template={template} {...item} />
      ))}
    </Carousel>
  );
}
