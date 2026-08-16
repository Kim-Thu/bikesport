import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

function formatEventDate(value?: string) {
  if (!value) return { day: "--", month: "---" };
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("vi-VN", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("vi-VN", { month: "short" }).format(date).replace("thg", "THG").toUpperCase(),
  };
}

export function EventTemplate({
  title,
  href,
  mediaId,
  startAt,
  location,
  attendees,
  actionLabel = "Đăng ký ngay",
  className,
}: CardProps) {
  const date = formatEventDate(startAt);

  return (
    <article className={cn("group relative overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
      <CLink href={href} className="relative block min-h-40 overflow-hidden">
        <MediaImage
          mediaId={mediaId}
          alt={title}
          width={480}
          height={280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-center text-blue-600">
          <div className="text-lg font-black leading-none">{date.day}</div>
          <div className="mt-1 text-2xs font-bold uppercase leading-none">{date.month}</div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <h3 className="text-sm font-bold sm:text-base">{title}</h3>
          {location ? <div className="mt-1 text-xs text-white/80">{location}</div> : null}
          {typeof attendees === "number" ? <div className="mt-1 text-xs text-white/80">{attendees} người tham gia</div> : null}
          <div className="mt-2 text-xs font-bold uppercase">{actionLabel}</div>
        </div>
      </CLink>
    </article>
  );
}
