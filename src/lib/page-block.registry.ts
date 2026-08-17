import { AdsBlock } from "@/components/block/AdsBlock";
import { CardBlock } from "@/components/block/CardBlock";
import { CardGridBlock } from "@/components/block/CardGridBlock";
import { IconListBlock } from "@/components/block/IconListBlock";
import { InlineFormBlock } from "@/components/block/InlineFormBlock";
import { MediaBlock } from "@/components/block/MediaBlock";
import { MediaCtaBlock } from "@/components/block/MediaCtaBlock";
import { ProductSliderBlock } from "@/components/block/ProductSliderBlock";
import { TabsGridBlock } from "@/components/block/TabsGridBlock";
import { TabsSliderBlock } from "@/components/block/TabsSliderBlock";
import { TimelineBlock } from "@/components/block/TimelineBlock";
import type { PageBlockComponent } from "@/interfaces/page-block.interface";

export const PAGE_BLOCK_COMPONENTS = {
  ads: AdsBlock,
  card: CardBlock,
  "product-slider": ProductSliderBlock,
  "tabs-slider": TabsSliderBlock,
  "tabs-grid": TabsGridBlock,
  "card-grid": CardGridBlock,
  "icon-list": IconListBlock,
  "media-cta": MediaCtaBlock,
  media: MediaBlock,
  "inline-form": InlineFormBlock,
  timeline: TimelineBlock,
} satisfies Record<PageBlockComponent, unknown>;
