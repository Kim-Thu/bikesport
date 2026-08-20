import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { SocialLinkOptions } from "@/interfaces/options.interface";

interface SocialProps {
  items: SocialLinkOptions[];
  mediaUrlById?: Record<string, string>;
}

export function Social({ items, mediaUrlById = {} }: SocialProps) {
  if (!items.length) return null;

  return (
    <div className="flex items-center gap-4" aria-label="Mạng xã hội">
      {items.map((item) => {
        const mediaUrl = item.iconMediaId ? mediaUrlById[item.iconMediaId] : undefined;

        return (
          <CLink
            key={item.name}
            href={item.href}
            aria-label={item.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-blue-700 hover:text-blue-700"
          >
            {mediaUrl ? <Icon mediaUrl={mediaUrl} className="h-4 w-4" /> : null}
          </CLink>
        );
      })}
    </div>
  );
}
