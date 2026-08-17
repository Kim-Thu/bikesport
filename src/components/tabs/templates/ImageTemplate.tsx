import { MediaImage } from "@/components/media/MediaImage";
import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

export function ImageTemplate({ item, active, onClick }: TabTemplateProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-tab-value={item.value}
      className={cn(
        "shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white p-2 transition-colors hover:border-blue-200",
        active ? "border-blue-300" : "border-gray-100",
      )}
      onClick={onClick}
    >
      <span className="flex h-10 w-20 items-center justify-center sm:h-12 sm:w-24">
        <MediaImage
          mediaId={item.mediaId}
          alt={item.label}
          width={96}
          height={48}
          className="h-full w-full object-contain"
        />
        <span className="sr-only">{item.label}</span>
      </span>
    </button>
  );
}
