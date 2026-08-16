import { MediaImage } from "@/components/media/MediaImage";
import type { NavMenuItem } from "@/interfaces/navigation.interface";

export function MenuItemContent({ item }: { item: NavMenuItem }) {
  const display = item.display ?? "text";
  const showImage = display === "image" || display === "image-text";
  const showText = display === "text" || display === "image-text";

  return (
    <>
      {showImage && item.mediaId ? (
        <MediaImage
          mediaId={item.mediaId}
          alt={item.label}
          width={120}
          height={48}
          className="h-8 w-auto max-w-28 object-contain"
        />
      ) : null}
      {showText && item.label ? <span>{item.label}</span> : null}
    </>
  );
}
