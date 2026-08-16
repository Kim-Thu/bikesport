import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { MediaBlockPayload } from "@/interfaces/page-block.interface";

export function MediaBlock({ block }: { block: MediaBlockPayload }) {
  const media = (
    <div className="aspect-1/2 w-full overflow-hidden rounded-lg">
      <MediaImage
        mediaId={block.props.mediaId}
        alt={block.props.alt}
        width={300}
        height={600}
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
