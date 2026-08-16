import { BannerBackground } from "@/components/banner/BannerBackground";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function ImageOnlyBanner({ banner }: { banner: BannerRecord }) {
  return (
    <div className="relative min-h-88 w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent lg:min-h-125">
      <BannerBackground banner={banner} />
    </div>
  );
}
