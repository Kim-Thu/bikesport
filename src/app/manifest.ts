import type { MetadataRoute } from "next";
import { getMediaUrl } from "@/lib/media.utils";

export default function manifest(): MetadataRoute.Manifest {
  const icon192 = getMediaUrl("66bf4e8c9f2a4d7b8c1e3711");
  const icon512 = getMediaUrl("66bf4e8c9f2a4d7b8c1e3712");

  return {
    name: "Bike Sport",
    short_name: "Bike Sport",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      ...(icon192 ? [{ src: icon192, sizes: "192x192", type: "image/png" }] : []),
      ...(icon512 ? [{ src: icon512, sizes: "512x512", type: "image/png" }] : []),
    ],
  };
}
