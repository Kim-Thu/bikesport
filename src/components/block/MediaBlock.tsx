import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { MediaBlockPayload } from "@/interfaces/page-block.interface";
import { getMediaPresentation } from "@/lib/media-presentation.utils";

export function MediaBlock({ block }: { block: MediaBlockPayload }) {
  const presentation = getMediaPresentation(block.props.mediaId, block.props.aspect);
  const media = (
    <div className={`${presentation.aspectClassName} h-full w-full overflow-hidden rounded-lg`}>
      <MediaImage
        mediaId={block.props.mediaId}
        alt={block.props.alt}
        width={presentation.size.width}
        height={presentation.size.height}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return block.props.href ? (
    <CLink href={block.props.href} aria-label={block.props.alt} className="block h-full cursor-pointer">
      {media}
    </CLink>
  ) : (
    media
  );
}
