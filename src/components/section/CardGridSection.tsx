import { Card } from "@/components/card/Card";
import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridSectionPayload } from "@/interfaces/page.interface";
import { getFeaturedCategoriesByType } from "@/lib/category.utils";
import { cn } from "@/lib/classname.utils";

export function CardGridSection({ section }: { section: CardGridSectionPayload }) {
  const items = getFeaturedCategoriesByType(section.props.source.categoryType, section.props.source.limit);

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <SectionHeader
          title={section.props.title}
          titleMediaId={section.props.titleMediaId}
          titleAlt={section.props.titleAlt}
          href={section.props.href}
          actionLabel={section.props.actionLabel}
          template={section.props.headingTemplate}
          className="mb-4"
        />

        {items.length ? (
          <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", section.props.gridClassName)}>
            {items.map((item) => (
              <Card
                key={item._id}
                template={section.props.template}
                title={item.name}
                href={`/danh-muc/${item.slug}`}
                mediaId={item.mediaId}
              />
            ))}
          </div>
        ) : (
          <EmptyContent />
        )}
      </Container>
    </Section>
  );
}
