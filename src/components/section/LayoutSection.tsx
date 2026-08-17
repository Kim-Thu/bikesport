import { BlockRenderer } from "@/components/block/BlockRenderer";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import type { LayoutSectionPayload } from "@/interfaces/page.interface";
import { cn } from "@/lib/classname.utils";
import { SECTION_CONTAINER_CLASS } from "@/variants/section.variant";

export function LayoutSection({ section }: { section: LayoutSectionPayload }) {
  const sectionTemplate = section.props.sectionTemplate ?? "default";
  const containerClassName = cn(
    SECTION_CONTAINER_CLASS[sectionTemplate],
    section.props.containerClassName,
  );

  return (
    <Section template={sectionTemplate} className={section.props.sectionClassName}>
      <Container className={containerClassName}>
        {section.rows.map((row) => (
          <Row key={row._id} className={row.props?.className}>
            {row.columns.map((column) => (
              <Column key={column._id} grow={column.props?.grow} className={column.props?.className}>
                {column.blocks.map((block) => (
                  <BlockRenderer key={block._id} block={block} />
                ))}
              </Column>
            ))}
          </Row>
        ))}
      </Container>
    </Section>
  );
}
