import { BoxIcon } from "@/components/box/BoxIcon";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import { Stack } from "@/components/stack/Stack";
import type { StackSectionPayload } from "@/interfaces/page.interface";
import { cn } from "@/lib/classname.utils";
import { getStackColumnDividerClass } from "@/lib/stack-section.utils";

export function StackSection({ section }: { section: StackSectionPayload }) {
  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <Stack variant={section.props.variant}>
          <Row className={cn("items-stretch", section.props.rowClassName)}>
            {section.columns.map((column, index) => (
              <Column
                key={column._id}
                className={cn(
                  "w-full px-5 py-5 sm:w-1/2 lg:w-1/4 lg:px-6",
                  getStackColumnDividerClass(index, section.props.variant),
                )}
              >
                <BoxIcon {...column.props} />
              </Column>
            ))}
          </Row>
        </Stack>
      </Container>
    </Section>
  );
}
