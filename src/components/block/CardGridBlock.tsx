import { Card } from "@/components/card/Card";
import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";
import { cn } from "@/lib/classname.utils";

export function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  const items = getCardGridItems(block.props.source);

  return (
    <div>
      <SectionHeader
        title={block.props.title}
        titleMediaId={block.props.titleMediaId}
        titleAlt={block.props.titleAlt}
        href={block.props.href}
        actionLabel={block.props.actionLabel}
        template={block.props.headingTemplate}
        className="mb-4"
      />

      {items.length ? (
        <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", block.props.gridClassName)}>
          {items.map((item) => (
            <Card key={item.href} template={block.props.template} {...item} />
          ))}
        </div>
      ) : (
        <EmptyContent />
      )}
    </div>
  );
}
