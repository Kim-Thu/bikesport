import type { MetadataRoute } from "next";
import wpOption from "@/data/wp-option.json";
import { getMediaUrl } from "@/lib/media.utils";

export default function manifest(): MetadataRoute.Manifest {
  const icon192 = getMediaUrl(wpOption.site.icons.pwa192MediaId);
  const icon512 = getMediaUrl(wpOption.site.icons.pwa512MediaId);

  return {
    name: wpOption.site.siteTitle,
    short_name: wpOption.site.siteTitle,
    description: wpOption.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: wpOption.site.theme.backgroundColor,
    theme_color: wpOption.site.theme.themeColor,
    icons: [
      ...(icon192 ? [{ src: icon192, sizes: "192x192", type: "image/png" }] : []),
      ...(icon512 ? [{ src: icon512, sizes: "512x512", type: "image/png" }] : []),
    ],
  };
}
