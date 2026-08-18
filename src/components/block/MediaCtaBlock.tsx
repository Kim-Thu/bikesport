import { MediaCta } from "@/components/cta/MediaCta";
import type { MediaCtaBlockPayload } from "@/interfaces/page-block.interface";

export function MediaCtaBlock({ block }: { block: MediaCtaBlockPayload }) {
  return <MediaCta {...block.props} />;
}
