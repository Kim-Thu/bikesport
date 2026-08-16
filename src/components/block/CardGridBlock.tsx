import { Card } from "@/components/card/Card";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";
import { getFeaturedEvents } from "@/lib/event.utils";

export function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  const items = getFeaturedEvents(block.props.source.limit);
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
          <Card
            key={item._id}
            template={block.props.template}
            title={item.title}
            href={`/su-kien/${item.slug}`}
            mediaId={item.mediaId}
            startAt={item.startAt}
            location={item.location}
            attendees={item.attendees}
          />
        ))}
      </div>
    </div>
  );
}
