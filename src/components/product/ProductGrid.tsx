import { Card } from "@/components/card/Card";
import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { CardTemplate } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

interface ProductGridProps {
  items: ProductSliderItem[];
  template: CardTemplate;
  className?: string;
}

export function ProductGrid({ items, template, className }: ProductGridProps) {
  if (!items.length) return null;

  return (
    <div className={cn("grid grid-cols-1 gap-4 max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {items.map(({ _key, ...item }) => (
        <Card key={_key} template={template} {...item} />
      ))}
    </div>
  );
}
