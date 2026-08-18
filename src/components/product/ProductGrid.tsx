import { Card } from "@/components/card/Card";
import type { CardTemplate } from "@/interfaces/card.interface";
import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import { cn } from "@/lib/classname.utils";

interface ProductGridProps {
  items: ProductCollectionItem[];
  template: CardTemplate;
  className?: string;
}

export function ProductGrid({ items, template, className }: ProductGridProps) {
  if (!items.length) return null;

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {items.map(({ _key, ...item }) => (
        <Card key={_key} template={template} {...item} />
      ))}
    </div>
  );
}
