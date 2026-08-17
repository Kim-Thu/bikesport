import { MediaImage } from "@/components/media/MediaImage";
import type { TimelineBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";

export function TimelineBlock({ block }: { block: TimelineBlockPayload }) {
  const lastIndex = block.props.items.length - 1;

  return (
    <div className={cn("w-full", block.props.className)}>
      <div className="grid gap-6 md:grid-cols-3 lg:flex lg:gap-0">
        {block.props.items.map((item, index) => (
          <article
            key={`${item.label}-${index}`}
            className="flex min-w-0 flex-col items-center text-center lg:flex-1"
          >
            <div className="mb-3 hidden w-full items-center lg:flex" aria-hidden="true">
              <span className={cn("h-px flex-1", index === 0 ? "bg-transparent" : "bg-blue-300")} />
              <span
                className={cn(
                  "h-3 w-3 shrink-0 rounded-full border-2 border-blue-600",
                  index === lastIndex ? "bg-blue-600" : "bg-white",
                )}
              />
              <span className={cn("h-px flex-1", index === lastIndex ? "bg-transparent" : "bg-blue-300")} />
            </div>

            <div className="flex w-full flex-col items-center px-3">
              <p className="text-sm font-bold text-blue-600">{item.label}</p>
              <h3 className="mt-2 text-sm font-semibold text-gray-950">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              ) : null}

              {item.mediaId !== undefined ? (
                <div className="mt-4 w-full overflow-hidden rounded-lg">
                  <MediaImage
                    mediaId={item.mediaId}
                    alt={item.mediaAlt || item.title}
                    width={360}
                    height={240}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
