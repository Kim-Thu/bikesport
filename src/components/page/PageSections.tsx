import { PAGE_SECTION_COMPONENTS } from "@/components/page/page-section.registry";
import type { PageSectionPayload } from "@/interfaces/page.interface";

function PageSection({ section }: { section: PageSectionPayload }) {
  if (section.status !== "active") return null;

  const Component = PAGE_SECTION_COMPONENTS[section.component];

  return <Component section={section} />;
}

export function PageSections({ sections }: { sections: PageSectionPayload[] }) {
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => <PageSection key={section._id} section={section} />);
}
