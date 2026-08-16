import { PageSection } from "@/components/page/PageSection";
import type { PageSectionPayload } from "@/interfaces/page.interface";

export function PageSections({ sections }: { sections: PageSectionPayload[] }) {
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => <PageSection key={section._id} section={section} />);
}
