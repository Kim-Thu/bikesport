import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";
import { formatShortDate } from "@/lib/date.utils";

export function OverlayTemplate({
  title,
  href,
  media,
  startAt,
  location,
  attendees,
  actionLabel = "Đăng ký ngay",
  className,
}: CardProps) {
  const date = formatShortDate(startAt);

  return (
    <article className={cn("group relative overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
      <CLink href={href} className="relative block aspect-video overflow-hidden">
        {media ? (
          <MediaImageView
            media={media}
            alt={title}
            width={480}
            height={270}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}

        <div className="absolute inset-0 flex flex-col bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 text-white">
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-white text-center text-blue-600">
              <div className="text-lg font-black leading-none">{date.day}</div>
              <div className="mt-1 text-2xs font-bold uppercase leading-none">{date.month}</div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold sm:text-base">{title}</h3>
              {location ? (
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <Icon name="location" size={14} strokeWidth={2} />
                  <span>{location}</span>
                </div>
              ) : null}
              {typeof attendees === "number" ? (
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <Icon name="users" size={14} strokeWidth={2} />
                  <span>{attendees} người tham gia</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-auto text-xs font-bold uppercase">{actionLabel}</div>
        </div>
      </CLink>
    </article>
  );
}
