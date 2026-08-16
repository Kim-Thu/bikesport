import { Banner } from "@/components/banner/Banner";
import { BoxIcon } from "@/components/box/BoxIcon";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import { Stack } from "@/components/stack/Stack";
import type { PageSectionPayload, StackSectionPayload } from "@/interfaces/page.interface";
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

function StackSection({ section }: { section: StackSectionPayload }) {
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

function PageSection({ section }: { section: PageSectionPayload }) {
  if (section.status !== "active") return null;

  if (section.component === "banner") {
    return <Banner bannerId={section.props.bannerId} />;
  }

  if (section.component === "stack") {
    return <StackSection section={section} />;
  }

  return null;
}

export function PageSections({ sections }: { sections: PageSectionPayload[] }) {
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => <PageSection key={section._id} section={section} />);
}
