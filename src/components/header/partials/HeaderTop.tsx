import { HeaderRegion } from "@/components/header/partials/HeaderRegion";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderTop({ region }: HeaderPartialProps) {
  return <HeaderRegion region={region} className="bg-blue-600" />;
}
