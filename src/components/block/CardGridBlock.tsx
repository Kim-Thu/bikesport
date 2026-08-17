import { CardGrid } from "@/components/grid/CardGrid";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";

export function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  return (
    <CardGrid
      items={getCardGridItems(block.props.source)}
      template={block.props.template}
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      headingTemplate={block.props.headingTemplate}
      gridClassName={block.props.gridClassName}
    />
  );
}
