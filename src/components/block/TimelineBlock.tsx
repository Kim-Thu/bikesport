import { MediaImage } from "@/components/media/MediaImage";
import type { TimelineBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";

export function TimelineBlock({ block }: { block: TimelineBlockPayload }) {
  const lastIndex = block.props.items.length - 1;

  return (
    <div className={cn("w-full", block.props.className)}>
      <div className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        <div
          className="absolute left-[10%] right-[10%] top-1.5 hidden h-px bg-blue-300 lg:block"
          aria-hidden="true"
        />

        {block.props.items.map((item, index) => (
          <article key={`${item.label}-${index}`} className="relative flex min-w-0 flex-col items-center text-center">
            <div className="relative z-10 mb-3 flex w-full justify-center" aria-hidden="true">
              <span
                className={cn(
                  "h-3 w-3 rounded-full border-2 border-blue-600",
                  index === lastIndex ? "bg-blue-600" : "bg-white",
                )}
              />
            </div>

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
          </article>
        ))}
      </div>
    </div>
  );
}
