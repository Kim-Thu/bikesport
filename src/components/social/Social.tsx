import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { MediaItem } from "@/interfaces/media.interface";
import type { SocialLinkOptions } from "@/interfaces/options.interface";

interface SocialProps {
  items: SocialLinkOptions[];
  mediaById?: Record<string, MediaItem>;
}

export function Social({ items, mediaById = {} }: SocialProps) {
  if (!items.length) return null;

  return (
    <div className="flex items-center gap-3" aria-label="Mạng xã hội">
      {items.map((item) => {
        const media = item.iconMediaId ? mediaById[item.iconMediaId] : undefined;

        return (
          <CLink
            key={item.name}
            href={item.href}
            aria-label={item.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            {media ? <Icon media={media} className="h-4 w-4" /> : null}
          </CLink>
        );
      })}
    </div>
  );
}
