import { Card } from "@/components/card/Card";
import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridProps } from "@/interfaces/card-grid.interface";
import { cn } from "@/lib/classname.utils";

export function CardGrid({
  items,
  template,
  title,
  titleMediaId,
  titleAlt,
  href,
  actionLabel,
  headingTemplate,
  gridClassName,
  defaultGridClassName = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
}: CardGridProps) {
  return (
    <div>
      <SectionHeader
        title={title}
        titleMediaId={titleMediaId}
        titleAlt={titleAlt}
        href={href}
        actionLabel={actionLabel}
        template={headingTemplate}
        className="mb-4"
      />

      {items.length ? (
        <div className={cn(defaultGridClassName, gridClassName)}>
          {items.map((item) => (
            <Card key={item.href} template={template} {...item} />
          ))}
        </div>
      ) : (
        <EmptyContent />
      )}
    </div>
  );
}
