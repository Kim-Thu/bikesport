import type {
  AdsBlockPayload,
  CardBlockPayload,
  CardGridBlockPayload,
  ProductSliderBlockPayload,
  TabsGridBlockPayload,
  TabsSliderBlockPayload,
} from "@/interfaces/blocks/collection-block.interface";
import type {
  ContentBlockPayload,
  IconListBlockPayload,
  InlineFormBlockPayload,
  SectionHeaderBlockPayload,
  TimelineBlockPayload,
} from "@/interfaces/blocks/content-block.interface";
import type {
  MediaBlockPayload,
  MediaCtaBlockPayload,
} from "@/interfaces/blocks/media-block.interface";
import type { PageBlockComponent } from "@/interfaces/blocks/page-block-base.interface";

export type {
  AdsBlockPayload,
  CardBlockPayload,
  CardGridBlockPayload,
  ProductSliderBlockPayload,
  TabsGridBlockPayload,
  TabsSliderBlockPayload,
} from "@/interfaces/blocks/collection-block.interface";
export type {
  ContentBlockPayload,
  IconListBlockPayload,
  InlineFormBlockPayload,
  SectionHeaderBlockPayload,
  TimelineBlockPayload,
} from "@/interfaces/blocks/content-block.interface";
export type {
  MediaBlockPayload,
  MediaCtaBlockPayload,
} from "@/interfaces/blocks/media-block.interface";
export type {
  PageBlockBase,
  PageBlockComponent,
  PageBlockStatus,
} from "@/interfaces/blocks/page-block-base.interface";
export type { ProductSource } from "@/interfaces/product-source.interface";

export type PageBlockPayload =
  | AdsBlockPayload
  | CardBlockPayload
  | ProductSliderBlockPayload
  | TabsSliderBlockPayload
  | TabsGridBlockPayload
  | CardGridBlockPayload
  | IconListBlockPayload
  | MediaCtaBlockPayload
  | MediaBlockPayload
  | InlineFormBlockPayload
  | SectionHeaderBlockPayload
  | ContentBlockPayload
  | TimelineBlockPayload;

export type PageBlockPayloadMap = {
  [Component in PageBlockComponent]: Extract<PageBlockPayload, { component: Component }>;
};
