import { Logo } from "@/components/logo/Logo";
import type { LogoProps } from "@/interfaces/logo.interface";
import { getSiteOptions } from "@/lib/options.utils";

type LogoLoaderProps = Omit<LogoProps, "site">;

export async function LogoLoader(props: LogoLoaderProps) {
  const options = await getSiteOptions();
  return <Logo {...props} site={options.site} />;
}
