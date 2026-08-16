import { Card } from "@/components/card/Card";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";
import { cn } from "@/lib/classname.utils";

export function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  const items = getCardGridItems(block.props.source);
  if (!items.length) return null;

  return (
    <div>
      <SectionHeader
        title={block.props.title}
        href={block.props.href}
        actionLabel={block.props.actionLabel}
        className="mb-4"
      />
      <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", block.props.gridClassName)}>
        {items.map((item) => (
          <Card key={item.href} template={block.props.template} {...item} />
        ))}
      </div>
    </div>
  );
}
