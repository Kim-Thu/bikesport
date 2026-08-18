import { ActionLink } from "@/components/link/ActionLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";
import type { MediaCtaProps } from "@/interfaces/media-cta.interface";

export function MediaCta({
  eyebrow,
  title,
  description,
  href,
  actionLabel = "Xem thêm",
  mediaId,
}: MediaCtaProps) {
  return (
    <Panel className="relative overflow-hidden bg-blue-50">
      <MediaImage
        mediaId={mediaId}
        alt=""
        width={1440}
        height={640}
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      <div className="absolute inset-0 bg-linear-to-r from-blue-50 via-blue-50/95 to-transparent" />

      <div className="relative z-10 max-w-3xl p-6 sm:p-8">
        {eyebrow ? <div className="text-xs font-bold uppercase text-blue-700">{eyebrow}</div> : null}
        <div className="mt-1 text-xl font-black uppercase leading-tight text-blue-700 sm:text-2xl">{title}</div>
        {description ? <div className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{description}</div> : null}
        <ActionLink href={href} size="sm" showArrow={false} className="mt-4">
          {actionLabel}
        </ActionLink>
      </div>
    </Panel>
  );
}
