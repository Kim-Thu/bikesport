import type { MediaAspect } from "@/interfaces/blocks/media-block.interface";
import { getMediaWithFallback } from "@/lib/media.utils";

const MEDIA_ASPECT_CLASS: Record<MediaAspect, string> = {
  portrait: "aspect-1/2",
  square: "aspect-square",
  landscape: "aspect-4/3",
  video: "aspect-video",
};

const MEDIA_RENDER_SIZE: Record<MediaAspect, { width: number; height: number }> = {
  portrait: { width: 300, height: 600 },
  square: { width: 600, height: 600 },
  landscape: { width: 800, height: 600 },
  video: { width: 960, height: 540 },
};

const VIDEO_RATIO_MIN = 1.6;
const LANDSCAPE_RATIO_MIN = 1.05;
const SQUARE_RATIO_MIN = 0.95;

async function inferMediaAspect(mediaId?: string | null): Promise<MediaAspect> {
  const media = await getMediaWithFallback(mediaId);
  if (!media?.width || !media.height) return "landscape";

  const ratio = media.width / media.height;
  if (ratio >= VIDEO_RATIO_MIN) return "video";
  if (ratio > LANDSCAPE_RATIO_MIN) return "landscape";
  if (ratio >= SQUARE_RATIO_MIN) return "square";
  return "portrait";
}

export async function getMediaPresentation(
  mediaId?: string | null,
  requestedAspect?: MediaAspect,
) {
  const aspect = requestedAspect ?? (await inferMediaAspect(mediaId));

  return {
    aspect,
    aspectClassName: MEDIA_ASPECT_CLASS[aspect],
    size: MEDIA_RENDER_SIZE[aspect],
  };
}
