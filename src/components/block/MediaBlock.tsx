import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { MediaBlockPayload } from "@/interfaces/page-block.interface";

const aspectClassMap: Record<NonNullable<MediaBlockPayload["props"]["aspect"]>, string> = {
  portrait: "aspect-1/2",
  square: "aspect-square",
  landscape: "aspect-4/3",
  video: "aspect-video",
};

const mediaSizeMap: Record<
  NonNullable<MediaBlockPayload["props"]["aspect"]>,
  { width: number; height: number }
> = {
  portrait: { width: 300, height: 600 },
  square: { width: 600, height: 600 },
  landscape: { width: 800, height: 600 },
  video: { width: 960, height: 540 },
};

export function MediaBlock({ block }: { block: MediaBlockPayload }) {
  const aspect = block.props.aspect ?? "portrait";
  const size = mediaSizeMap[aspect];
  const media = (
    <div className={`${aspectClassMap[aspect]} w-full overflow-hidden rounded-lg`}>
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
    <CLink href={block.props.href} aria-label={block.props.alt} className="block cursor-pointer">
      {media}
    </CLink>
  ) : (
    media
  );
}
