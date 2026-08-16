import { CardBlock } from "@/components/block/CardBlock";
import { CardGridBlock } from "@/components/block/CardGridBlock";
import { IconListBlock } from "@/components/block/IconListBlock";
import { InlineFormBlock } from "@/components/block/InlineFormBlock";
import { MediaBlock } from "@/components/block/MediaBlock";
import { MediaCtaBlock } from "@/components/block/MediaCtaBlock";
import { ProductSliderBlock } from "@/components/block/ProductSliderBlock";
import { TabsSliderBlock } from "@/components/block/TabsSliderBlock";
import type { PageBlockComponent } from "@/interfaces/page-block.interface";

export const PAGE_BLOCK_COMPONENTS = {
  card: CardBlock,
  "product-slider": ProductSliderBlock,
  "tabs-slider": TabsSliderBlock,
  "card-grid": CardGridBlock,
  "icon-list": IconListBlock,
  "media-cta": MediaCtaBlock,
  media: MediaBlock,
  "inline-form": InlineFormBlock,
} satisfies Record<PageBlockComponent, unknown>;
