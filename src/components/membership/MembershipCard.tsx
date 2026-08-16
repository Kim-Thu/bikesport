import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";

interface MembershipCardProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  actionLabel?: string;
  mediaId?: string | null;
}

export function MembershipCard({
  eyebrow,
  title,
  description,
  href,
  actionLabel = "Đăng ký ngay",
  mediaId,
}: MembershipCardProps) {
  return (
    <Panel className="relative overflow-hidden bg-blue-50 p-4">
      <div className="relative z-10 w-3/5">
        {eyebrow ? <div className="text-xs font-bold uppercase text-blue-600">{eyebrow}</div> : null}
        <div className="mt-1 text-lg font-black uppercase leading-tight text-blue-700">{title}</div>
        {description ? <div className="mt-2 text-xs leading-relaxed text-gray-600">{description}</div> : null}
        <CLink
          href={href}
          className="mt-4 inline-flex rounded-md bg-blue-600 px-3 py-2 text-xs font-bold uppercase text-white hover:bg-blue-700"
        >
          {actionLabel}
        </CLink>
      </div>

      <MediaImage
        mediaId={mediaId}
        alt={title}
        width={220}
        height={180}
        className="absolute bottom-0 right-0 h-full w-2/5 object-contain object-bottom"
      />
    </Panel>
  );
}
