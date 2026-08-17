import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { MediaBlockPayload } from "@/interfaces/page-block.interface";
import { getMediaWithFallback } from "@/lib/media.utils";

type MediaAspect = NonNullable<MediaBlockPayload["props"]["aspect"]>;

const aspectClassMap: Record<MediaAspect, string> = {
  portrait: "aspect-1/2",
  square: "aspect-square",
  landscape: "aspect-4/3",
  video: "aspect-video",
};

const mediaSizeMap: Record<MediaAspect, { width: number; height: number }> = {
  portrait: { width: 300, height: 600 },
  square: { width: 600, height: 600 },
  landscape: { width: 800, height: 600 },
  video: { width: 960, height: 540 },
};

function resolveAspect(block: MediaBlockPayload): MediaAspect {
  if (block.props.aspect) return block.props.aspect;

  const media = getMediaWithFallback(block.props.mediaId);
  if (!media?.width || !media.height) return "landscape";

  const ratio = media.width / media.height;
  if (ratio >= 1.6) return "video";
  if (ratio > 1.05) return "landscape";
  if (ratio >= 0.95) return "square";
  return "portrait";
}

export function MediaBlock({ block }: { block: MediaBlockPayload }) {
  const aspect = resolveAspect(block);
  const size = mediaSizeMap[aspect];
  const wrapperClassName = block.props.fill
    ? "h-full min-h-full w-full overflow-hidden rounded-lg"
    : `${aspectClassMap[aspect]} w-full overflow-hidden rounded-lg`;

  const media = (
    <div className={wrapperClassName}>
      <MediaImage
        mediaId={block.props.mediaId}
        alt={block.props.alt}
        width={size.width}
        height={size.height}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return block.props.href ? (
    <CLink
      href={block.props.href}
      aria-label={block.props.alt}
      className={block.props.fill ? "block h-full cursor-pointer" : "block cursor-pointer"}
    >
      {media}
    </CLink>
  ) : (
    media
  );
}
