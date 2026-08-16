import type { ComponentType } from "react";
import type { PageBlockPayload } from "@/interfaces/page-block.interface";
import { PAGE_BLOCK_COMPONENTS } from "@/lib/page-block.registry";

export function BlockRenderer({ block }: { block: PageBlockPayload }) {
  if (block.status !== "active") return null;

  const Component = PAGE_BLOCK_COMPONENTS[block.component] as unknown as ComponentType<{
    block: PageBlockPayload;
  }>;

  return <Component block={block} />;
}
