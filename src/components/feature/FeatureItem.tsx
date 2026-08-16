import { Icon } from "@/components/icon/Icon";
import type { BannerFeature } from "@/interfaces/banner.interface";

export function FeatureItem({ iconMediaId, title, description }: BannerFeature) {
  return (
    <div className="flex items-start gap-2">
      {iconMediaId ? <Icon mediaId={iconMediaId} className="mt-0.5 h-5 w-5 text-blue-600" /> : null}
      <div>
        <div className="text-xs font-semibold text-gray-900 sm:text-sm">{title}</div>
        {description ? <div className="text-2xs text-gray-600 sm:text-xs">{description}</div> : null}
      </div>
    </div>
  );
}
