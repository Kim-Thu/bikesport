import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import { cn } from "@/lib/classname.utils";

interface ProductSliderProps {
  items: ProductCollectionItem[];
  template: CardTemplate;
  ariaLabel: string;
  trackClassName?: string;
  slideClassName?: string;
}

export function ProductSlider({
  items,
  template,
  ariaLabel,
  trackClassName,
  slideClassName,
}: ProductSliderProps) {
  if (!items.length) return null;

  return (
    <Carousel
      loop
      dragFree
      showArrows
      stretchSlides
      ariaLabel={ariaLabel}
      prevAriaLabel="Sản phẩm trước"
      nextAriaLabel="Sản phẩm tiếp theo"
      trackClassName={trackClassName}
      slideClassName={cn("max-sm:basis-full", slideClassName)}
      dotsClassName="hidden"
    >
      {items.map(({ _key, ...item }) => (
        <Card key={_key} template={template} {...item} />
      ))}
    </Carousel>
  );
}
