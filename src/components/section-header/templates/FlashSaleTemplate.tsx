import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({
  title,
  titleMedia,
  titleAlt,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-center rounded-lg bg-red-500 p-4 text-center text-white">
        <div className="flex min-w-0 items-center justify-center gap-2">
          {titleMedia ? (
            <MediaImageView
              media={titleMedia}
              alt={titleAlt ?? title ?? "Flash Sale"}
              width={240}
              height={64}
              className="max-h-12 w-auto object-contain"
            />
          ) : (
            <>
              <Icon name="flame" className="h-6 w-6 shrink-0" strokeWidth={2} />
              {title ? (
                <Heading level={2} className="min-w-0 text-base font-bold uppercase sm:text-xl">
                  {title}
                </Heading>
              ) : null}
            </>
          )}
        </div>
      </div>

      {children ? <div className="min-w-0">{children}</div> : null}
    </div>
  );
}
