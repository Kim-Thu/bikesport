import { MediaImage } from "@/components/media/MediaImage";
import type { TimelineBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";

export function TimelineBlock({ block }: { block: TimelineBlockPayload }) {
  return (
    <div className={cn("w-full", block.props.className)}>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {block.props.items.map((item, index) => (
          <article key={`${item.label}-${index}`} className="relative flex min-w-0 flex-col">
            <div className="mb-4 flex items-center" aria-hidden="true">
              <span className="h-3 w-3 shrink-0 rounded-full border-2 border-blue-600 bg-white" />
              {index < block.props.items.length - 1 ? <span className="h-px flex-1 bg-blue-200" /> : null}
            </div>

            <p className="text-sm font-bold text-blue-600">{item.label}</p>
            <h3 className="mt-2 text-sm font-semibold text-gray-950">{item.title}</h3>
            {item.description ? (
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            ) : null}

            {item.mediaId !== undefined ? (
              <div className="mt-4 overflow-hidden rounded-lg">
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
