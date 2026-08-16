import { CardGridBlock } from "@/components/page/blocks/CardGridBlock";
import { IconListBlock } from "@/components/page/blocks/IconListBlock";
import { InlineFormBlock } from "@/components/page/blocks/InlineFormBlock";
import { MediaCtaBlock } from "@/components/page/blocks/MediaCtaBlock";
import { TabsSliderBlock } from "@/components/page/blocks/TabsSliderBlock";
import type { PageBlockComponent } from "@/interfaces/page-block.interface";

export const PAGE_BLOCK_COMPONENTS = {
  "tabs-slider": TabsSliderBlock,
  "card-grid": CardGridBlock,
  "icon-list": IconListBlock,
  "media-cta": MediaCtaBlock,
  "inline-form": InlineFormBlock,
} satisfies Record<PageBlockComponent, unknown>;
