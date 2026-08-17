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
  const isNarrative =
    section.columns.length > 0 &&
    section.columns.every((column) => column.props.titleClassName?.includes("normal-case"));

  if (isNarrative) {
    const content = section.columns
      .map((column) => column.props.description?.trim())
      .filter(Boolean)
      .join(" ");

    if (!content) return null;

    return (
      <Section className={section.props.sectionClassName}>
        <Container>
          <p className="mx-auto max-w-4xl text-center text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {content}
          </p>
        </Container>
      </Section>
    );
  }

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
