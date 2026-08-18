import { IconList } from "@/components/list/IconList";
import type { IconListBlockPayload } from "@/interfaces/page-block.interface";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";

export async function IconListBlock({ block }: { block: IconListBlockPayload }) {
  const mediaIds = block.props.items.flatMap((item) => (item.mediaId ? [item.mediaId] : []));
  const mediaById = await getMediaWithFallbackByIds(mediaIds);
  const mediaUrlById = Object.fromEntries(
    Object.entries(mediaById).map(([mediaId, media]) => [mediaId, media.src]),
  );

  return <IconList items={block.props.items} layout={block.props.layout} mediaUrlById={mediaUrlById} />;
}
