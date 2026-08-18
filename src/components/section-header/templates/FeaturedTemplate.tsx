import { Heading } from "@/components/heading/Heading";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function FeaturedTemplate({
  title,
  titleMedia,
  titleAlt,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      {titleMedia ? (
        <div className="flex items-center justify-center">
          <MediaImageView
            media={titleMedia}
            alt={titleAlt ?? title ?? "Section heading"}
            width={320}
            height={80}
            className="max-h-16 w-auto object-contain"
          />
        </div>
      ) : title ? (
        <Heading level={2} className="text-xl font-bold uppercase leading-tight text-gray-900 sm:text-2xl">
          {title}
        </Heading>
      ) : null}

      {children ? <div className="min-w-0 max-w-full">{children}</div> : null}
    </div>
  );
}
