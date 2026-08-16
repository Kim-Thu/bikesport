import { BlockRenderer } from "@/components/block/BlockRenderer";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import type { LayoutSectionPayload } from "@/interfaces/page.interface";

export function LayoutSection({ section }: { section: LayoutSectionPayload }) {
  return (
    <Section className={section.props.sectionClassName}>
      <Container>
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
