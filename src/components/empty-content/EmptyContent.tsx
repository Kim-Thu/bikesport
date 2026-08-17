import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { EmptyContentProps } from "@/interfaces/empty-content.interface";
import { cn } from "@/lib/classname.utils";

export function EmptyContent({
  title = "Chưa có nội dung",
  description = "Nội dung hiện chưa có sẵn. Vui lòng quay lại sau.",
  mediaId,
  mediaAlt = "Chưa có nội dung",
  actionLabel,
  actionHref,
  className,
}: EmptyContentProps) {
  const hasAction = Boolean(actionLabel && actionHref);

  return (
    <div
      className={cn(
        "flex min-h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center",
        className,
      )}
    >
      {mediaId !== undefined ? (
        <div className="mb-4 w-full max-w-48 overflow-hidden rounded-lg">
          <MediaImage
            mediaId={mediaId}
            alt={mediaAlt}
            width={320}
            height={180}
            className="aspect-video h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h3>

      {description ? (
        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">{description}</p>
      ) : null}

      {hasAction ? (
        <CLink
          href={actionHref!}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {actionLabel}
        </CLink>
      ) : null}
    </div>
  );
}
