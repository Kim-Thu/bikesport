import { Card } from "@/components/card/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { getFeaturedCategoriesByType } from "@/lib/category.utils";

export function CategoryGridSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "category-grid") return null;

  const categories = getFeaturedCategoriesByType(section.props.type, section.props.limit);

  if (!categories.length) return null;

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <SectionHeader
          title={section.props.title}
          href={section.props.href}
          actionLabel={section.props.actionLabel}
          className="mb-4"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Card
              key={category._id}
              template="category"
              title={category.name}
              href={`/danh-muc/${category.slug}`}
              mediaId={category.mediaId}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
