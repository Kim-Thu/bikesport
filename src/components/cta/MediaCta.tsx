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
  variant = "surface",
}: MediaCtaProps) {
  if (variant === "primary-inline") {
    return (
      <Panel className="relative overflow-hidden border-blue-700 bg-blue-700 text-white">
        <MediaImage
          mediaId={mediaId}
          alt=""
          width={1440}
          height={320}
          className="absolute inset-0 h-full w-full object-cover object-right opacity-20"
        />
        <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            {eyebrow ? <div className="text-xs font-bold uppercase text-white/80">{eyebrow}</div> : null}
            <div className="text-xl font-bold leading-tight text-white sm:text-2xl">{title}</div>
            {description ? <div className="mt-1 text-sm text-white/80 sm:text-base">{description}</div> : null}
          </div>
          <ActionLink href={href} tone="outline" size="md" className="shrink-0" showArrow>
            {actionLabel}
          </ActionLink>
        </div>
      </Panel>
    );
  }

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
