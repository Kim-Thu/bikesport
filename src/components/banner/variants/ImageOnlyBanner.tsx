import { BannerBackground } from "@/components/banner/BannerBackground";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function ImageOnlyBanner({ banner }: { banner: BannerRecord }) {
  return (
    <div className="relative aspect-hero-mobile w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent sm:aspect-hero-tablet lg:aspect-8/3">
      <BannerBackground banner={banner} />
    </div>
  );
}
