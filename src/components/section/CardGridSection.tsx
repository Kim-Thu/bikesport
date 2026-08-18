import { CardGrid } from "@/components/grid/CardGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import type { CardGridSectionPayload } from "@/interfaces/page.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";
import { resolvePageGridLayout, resolvePageSectionSpacing } from "@/variants/page-layout.variant";

export async function CardGridSection({ section }: { section: CardGridSectionPayload }) {
  const items = await getCardGridItems(section.props.source);

  return (
    <Section className={resolvePageSectionSpacing(section.props.spacing)}>
      <Container>
        <CardGrid
          items={items}
          template={section.props.template}
          title={section.props.title}
          titleMediaId={section.props.titleMediaId}
          titleAlt={section.props.titleAlt}
          href={section.props.href}
          actionLabel={section.props.actionLabel}
          headingTemplate={section.props.headingTemplate}
          gridClassName={resolvePageGridLayout(section.props.gridLayout)}
          defaultGridClassName="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        />
      </Container>
    </Section>
  );
}
