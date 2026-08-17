import { Logo } from "@/components/logo/Logo";
import type { LogoProps } from "@/interfaces/logo.interface";
import { getMediaById } from "@/lib/media.utils";
import { getSiteOptions } from "@/lib/options.utils";

type LogoLoaderProps = Omit<LogoProps, "site" | "logoMedia">;

export async function LogoLoader(props: LogoLoaderProps) {
  const options = await getSiteOptions();
  const logoMedia = options.site.logoMediaId
    ? await getMediaById(options.site.logoMediaId)
    : null;

  return <Logo {...props} site={options.site} logoMedia={logoMedia} />;
}
