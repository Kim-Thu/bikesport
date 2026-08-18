import { CardGrid } from "@/components/grid/CardGrid";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";
import { resolvePageGridLayout } from "@/variants/page-layout.variant";

export async function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  const items = await getCardGridItems(block.props.source);

  return (
    <CardGrid
      items={items}
      template={block.props.template}
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      headingTemplate={block.props.headingTemplate}
      gridClassName={resolvePageGridLayout(block.props.gridLayout, block.props.gridClassName)}
    />
  );
}
