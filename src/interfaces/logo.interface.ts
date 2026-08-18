import type { MediaItem } from "@/interfaces/media.interface";
import type { SiteIdentityOptions } from "@/interfaces/options.interface";

export interface LogoProps {
  href?: string;
  site: SiteIdentityOptions;
  logoMedia?: MediaItem | null;
}
