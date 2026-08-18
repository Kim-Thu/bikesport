import { HeaderRegion } from "@/components/header/partials/HeaderRegion";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderMain({ region }: HeaderPartialProps) {
  return <HeaderRegion region={region} className="bg-white" />;
}
