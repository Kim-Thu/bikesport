import type { ComponentType } from "react";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { PAGE_SECTION_COMPONENTS } from "@/lib/page-section.registry";

export function PageSection({ section }: { section: PageSectionPayload }) {
  if (section.status !== "active") return null;

  const Component = PAGE_SECTION_COMPONENTS[section.component] as unknown as ComponentType<{
    section: PageSectionPayload;
  }>;

  return <Component section={section} />;
}
