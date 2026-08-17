import Image from "next/image";
import type { MenuItemContentProps } from "@/interfaces/navigation.interface";

export function MenuItemContent({ item, mediaById }: MenuItemContentProps) {
  const display = item.display ?? "text";
  const showImage = display === "image" || display === "image-text";
  const showText = display === "text" || display === "image-text";
  const media = item.mediaId ? mediaById[item.mediaId] : undefined;

  return (
    <>
      {showImage && media ? (
        <Image
          src={media.src}
          alt={item.label ?? media.alt ?? media.name}
          width={120}
          height={48}
          className="h-8 w-auto max-w-28 object-contain"
        />
      ) : null}
      {showText && item.label ? <span>{item.label}</span> : null}
    </>
  );
}
