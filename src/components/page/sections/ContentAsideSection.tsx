import { Container } from "@/components/layout/Container";
import { PageBlock } from "@/components/page/PageBlock";
import { Section } from "@/components/section/Section";
import type { ContentAsideSectionPayload } from "@/interfaces/page.interface";
import { cn } from "@/lib/classname.utils";

export function ContentAsideSection({ section }: { section: ContentAsideSectionPayload }) {
  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]", section.props.gridClassName)}>
          <div className={cn("min-w-0 space-y-6", section.props.contentClassName)}>
            {section.content.map((block) => (
              <PageBlock key={block._id} block={block} />
            ))}
          </div>

          <aside className={cn("space-y-4", section.props.asideClassName)}>
            {section.aside.map((block) => (
              <PageBlock key={block._id} block={block} />
            ))}
          </aside>
        </div>
      </Container>
    </Section>
  );
}
