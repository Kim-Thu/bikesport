import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";

interface MediaCtaProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  actionLabel?: string;
  mediaId?: string | null;
}

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

      <div className="relative z-10 p-6 sm:w-3/5 sm:p-8">
        {eyebrow ? <div className="text-xs font-bold uppercase text-blue-600">{eyebrow}</div> : null}
        <div className="mt-1 text-xl font-black uppercase leading-tight text-blue-700 sm:text-2xl">{title}</div>
        {description ? <div className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{description}</div> : null}
        <div>
          <CLink
            href={href}
            className="mt-4 inline-flex rounded-md bg-blue-600 px-3 py-2 text-xs font-bold uppercase text-white hover:bg-blue-700"
          >
            {actionLabel}
          </CLink>
        </div>
      </div>
    </Panel>
  );
}
