import type { PageSectionPayload } from "@/interfaces/page.interface";
import { PAGE_SECTION_COMPONENTS } from "@/lib/page-section.registry";

export function PageSection({ section }: { section: PageSectionPayload }) {
  if (section.status !== "active") return null;

  switch (section.component) {
    case "banner": {
      const Component = PAGE_SECTION_COMPONENTS.banner;
      return <Component section={section} />;
    }
    case "stack": {
      const Component = PAGE_SECTION_COMPONENTS.stack;
      return <Component section={section} />;
    }
    case "card-grid": {
      const Component = PAGE_SECTION_COMPONENTS["card-grid"];
      return <Component section={section} />;
    }
    case "layout": {
      const Component = PAGE_SECTION_COMPONENTS.layout;
      return <Component section={section} />;
    }
  }
}
