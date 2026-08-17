import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { TabsGridTemplateProps } from "@/interfaces/tabs-grid.interface";

export function FeaturedDealsTemplate({
  header,
  grid,
  pagination,
  href,
  actionLabel = "Xem thêm ưu đãi",
  backgroundMediaId,
}: TabsGridTemplateProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-blue-50 p-4 sm:p-6">
      {backgroundMediaId !== undefined ? (
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <MediaImage
            mediaId={backgroundMediaId}
            alt=""
            width={1440}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="relative z-10">
        <div className="mb-5">{header}</div>
        {grid}
        {pagination}

        {href ? (
          <div className="mt-6 flex justify-center">
            <CLink
              href={href}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <span>{actionLabel}</span>
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </CLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
