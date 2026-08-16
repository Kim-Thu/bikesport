import { BannerBackground } from "@/components/banner/BannerBackground";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function ImageOnlyBanner({ banner }: { banner: BannerRecord }) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent sm:aspect-video lg:aspect-4/1">
      <BannerBackground banner={banner} />
    </div>
  );
}
