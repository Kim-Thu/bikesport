import { Ads } from "@/components/ads/Ads";
import type { AdsBlockPayload } from "@/interfaces/page-block.interface";
import { getActiveAdByPlacement } from "@/lib/ads.utils";

export async function AdsBlock({ block }: { block: AdsBlockPayload }) {
  const ad = await getActiveAdByPlacement(block.props.source.placement);
  if (!ad) return null;

  return <Ads ad={ad} />;
}
