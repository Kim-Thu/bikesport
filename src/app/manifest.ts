import type { MetadataRoute } from "next";
import { getMediaUrl } from "@/lib/media.utils";
import { getSiteOptions } from "@/lib/options.utils";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const options = await getSiteOptions();
  const [icon192, icon512] = await Promise.all([
    getMediaUrl(options.site.icons.pwa192MediaId),
    getMediaUrl(options.site.icons.pwa512MediaId),
  ]);

  return {
    name: options.site.siteTitle,
    short_name: options.site.siteTitle,
    description: options.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: options.site.theme.backgroundColor,
    theme_color: options.site.theme.themeColor,
    icons: [
      ...(icon192 ? [{ src: icon192, sizes: "192x192", type: "image/png" }] : []),
      ...(icon512 ? [{ src: icon512, sizes: "512x512", type: "image/png" }] : []),
    ],
  };
}
