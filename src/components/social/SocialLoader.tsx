import { Social } from "@/components/social/Social";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getSiteOptions } from "@/lib/options.utils";

export async function SocialLoader() {
  const options = await getSiteOptions();
  const items = options.contact.social ?? [];
  const mediaIds = items.flatMap((item) => (item.iconMediaId ? [item.iconMediaId] : []));
  const mediaById = await getMediaWithFallbackByIds(mediaIds);

  return <Social items={items} mediaById={mediaById} />;
}
