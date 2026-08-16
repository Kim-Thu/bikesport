import { BoxIcon } from "@/components/box/BoxIcon";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import { Stack } from "@/components/stack/Stack";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { cn } from "@/lib/classname.utils";

function getColumnDividerClass(index: number, variant: "surface" | "primary") {
  const borderColor = variant === "primary" ? "border-white/25" : "border-gray-200";

  return cn(
    borderColor,
    index === 1 && "border-t sm:border-l sm:border-t-0",
    index === 2 && "border-t lg:border-l lg:border-t-0",
    index === 3 && "border-t sm:border-l lg:border-t-0",
  );
}

export function StackSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "stack") return null;

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
                  getColumnDividerClass(index, section.props.variant),
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
