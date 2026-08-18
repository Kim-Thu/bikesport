import { BoxIcon } from "@/components/box/BoxIcon";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import { Stack } from "@/components/stack/Stack";
import type { StackSectionPayload } from "@/interfaces/page.interface";
import { cn } from "@/lib/classname.utils";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getStackColumnDividerClass } from "@/lib/stack-section.utils";
import {
  PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS,
  PAGE_BOX_ICON_TITLE_SIZE_CLASS,
  PAGE_BOX_ICON_TONE_CLASS,
} from "@/variants/box-icon.variant";
import {
  PAGE_ROW_LAYOUT_CLASS,
  PAGE_SECTION_SPACING_CLASS,
} from "@/variants/page-layout.variant";

export async function StackSection({ section }: { section: StackSectionPayload }) {
  const mediaIds = section.columns.flatMap((column) => (column.props.mediaId ? [column.props.mediaId] : []));
  const mediaById = await getMediaWithFallbackByIds(mediaIds);
  const sectionClassName = cn(
    section.props.spacing ? PAGE_SECTION_SPACING_CLASS[section.props.spacing] : undefined,
    section.props.sectionClassName,
  );
  const rowClassName = cn(
    "flex-col items-stretch lg:flex-row",
    section.props.rowLayout ? PAGE_ROW_LAYOUT_CLASS[section.props.rowLayout] : undefined,
    section.props.rowClassName,
  );

  return (
    <Section className={sectionClassName}>
      <Container>
        <Stack variant={section.props.variant}>
          <Row className={rowClassName}>
            {section.columns.map((column, index) => (
              <Column
                key={column._id}
                className={cn(
                  "w-full px-5 py-5 lg:min-w-0 lg:flex-1 lg:px-6",
                  getStackColumnDividerClass(index, section.props.variant),
                )}
              >
                <BoxIcon
                  icon={column.props.icon}
                  iconMediaUrl={column.props.mediaId ? mediaById[column.props.mediaId]?.src : undefined}
                  title={column.props.title}
                  description={column.props.description}
                  iconClassName={cn(
                    column.props.iconTone ? PAGE_BOX_ICON_TONE_CLASS[column.props.iconTone] : undefined,
                    column.props.iconClassName,
                  )}
                  titleClassName={cn(
                    column.props.titleSize ? PAGE_BOX_ICON_TITLE_SIZE_CLASS[column.props.titleSize] : undefined,
                    column.props.titleClassName,
                  )}
                  descriptionClassName={cn(
                    column.props.descriptionSize
                      ? PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS[column.props.descriptionSize]
                      : undefined,
                    column.props.descriptionClassName,
                  )}
                />
              </Column>
            ))}
          </Row>
        </Stack>
      </Container>
    </Section>
  );
}
