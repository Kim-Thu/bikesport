import { Heading } from "@/components/heading/Heading";
import { MediaImage } from "@/components/media/MediaImage";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function FeaturedTemplate({
  title,
  titleMediaId,
  titleAlt,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      {titleMediaId !== undefined ? (
        <div className="flex min-h-10 items-center justify-center">
          <MediaImage
            mediaId={titleMediaId}
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
