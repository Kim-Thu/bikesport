import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { CardGrid } from "@/components/grid/CardGrid";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { CardGridBlockPayload } from "@/interfaces/page-block.interface";
import { getCardGridItems } from "@/lib/card-grid-source.utils";
import {
  resolvePageGridLayout,
  resolvePageSliderSlide,
  resolvePageSliderTrack,
} from "@/variants/page-layout.variant";

export async function CardGridBlock({ block }: { block: CardGridBlockPayload }) {
  const items = await getCardGridItems(block.props.source);

  if (block.props.presentation === "slider") {
    return (
      <div>
        <SectionHeader
          title={block.props.title}
          titleMediaId={block.props.titleMediaId}
          titleAlt={block.props.titleAlt}
          href={block.props.href}
          actionLabel={block.props.actionLabel}
          template={block.props.headingTemplate}
          className="mb-4"
        />

        {items.length ? (
          <Carousel
            loop
            dragFree
            showArrows
            stretchSlides
            ariaLabel={block.props.title}
            prevAriaLabel="Nội dung trước"
            nextAriaLabel="Nội dung tiếp theo"
            trackClassName={resolvePageSliderTrack(block.props.trackLayout)}
            slideClassName={resolvePageSliderSlide(block.props.slideLayout)}
            dotsClassName="hidden"
          >
            {items.map(({ _key, ...item }) => (
              <Card key={_key} template={block.props.template} {...item} />
            ))}
          </Carousel>
        ) : (
          <EmptyContent />
        )}
      </div>
    );
  }

  return (
    <CardGrid
      items={items}
      template={block.props.template}
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      headingTemplate={block.props.headingTemplate}
      gridClassName={resolvePageGridLayout(block.props.gridLayout)}
    />
  );
}
