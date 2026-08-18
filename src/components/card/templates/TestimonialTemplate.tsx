import { MediaImageView } from "@/components/media/MediaImageView";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function TestimonialTemplate({
  title,
  eyebrow,
  description,
  media,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
          <MediaImageView
            media={media}
            alt={title}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-gray-950">{title}</h3>
          {eyebrow ? <p className="mt-1 text-xs text-gray-500">{eyebrow}</p> : null}
        </div>
      </div>

      {description ? (
        <blockquote className="mt-4 text-sm leading-6 text-gray-700">“{description}”</blockquote>
      ) : null}
    </article>
  );
}
