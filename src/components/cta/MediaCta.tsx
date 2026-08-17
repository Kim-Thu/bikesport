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
    <Panel className="grid min-h-56 overflow-hidden bg-blue-50 sm:min-h-64 sm:grid-cols-5">
      <div className="flex flex-col justify-center p-6 sm:col-span-3 sm:p-8">
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

      <div className="min-h-48 overflow-hidden sm:col-span-2 sm:min-h-0">
        <MediaImage
          mediaId={mediaId}
          alt={title}
          width={640}
          height={420}
          className="h-full w-full object-cover"
        />
      </div>
    </Panel>
  );
}
