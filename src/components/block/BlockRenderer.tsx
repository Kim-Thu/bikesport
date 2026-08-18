import type { PageBlockPayload } from "@/interfaces/page-block.interface";
import { PAGE_BLOCK_COMPONENTS } from "@/lib/page-block.registry";

export function BlockRenderer({ block }: { block: PageBlockPayload }) {
  if (block.status !== "active") return null;

  switch (block.component) {
    case "ads": {
      const Component = PAGE_BLOCK_COMPONENTS.ads;
      return <Component block={block} />;
    }
    case "card": {
      const Component = PAGE_BLOCK_COMPONENTS.card;
      return <Component block={block} />;
    }
    case "product-slider": {
      const Component = PAGE_BLOCK_COMPONENTS["product-slider"];
      return <Component block={block} />;
    }
    case "tabs-slider": {
      const Component = PAGE_BLOCK_COMPONENTS["tabs-slider"];
      return <Component block={block} />;
    }
    case "tabs-grid": {
      const Component = PAGE_BLOCK_COMPONENTS["tabs-grid"];
      return <Component block={block} />;
    }
    case "card-grid": {
      const Component = PAGE_BLOCK_COMPONENTS["card-grid"];
      return <Component block={block} />;
    }
    case "icon-list": {
      const Component = PAGE_BLOCK_COMPONENTS["icon-list"];
      return <Component block={block} />;
    }
    case "media-cta": {
      const Component = PAGE_BLOCK_COMPONENTS["media-cta"];
      return <Component block={block} />;
    }
    case "media": {
      const Component = PAGE_BLOCK_COMPONENTS.media;
      return <Component block={block} />;
    }
    case "inline-form": {
      const Component = PAGE_BLOCK_COMPONENTS["inline-form"];
      return <Component block={block} />;
    }
    case "section-header": {
      const Component = PAGE_BLOCK_COMPONENTS["section-header"];
      return <Component block={block} />;
    }
    case "content": {
      const Component = PAGE_BLOCK_COMPONENTS.content;
      return <Component block={block} />;
    }
    case "timeline": {
      const Component = PAGE_BLOCK_COMPONENTS.timeline;
      return <Component block={block} />;
    }
  }
}
