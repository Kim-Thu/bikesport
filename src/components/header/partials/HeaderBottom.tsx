import { RegionRenderer } from "@/components/RegionRenderer";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderBottom({ region }: HeaderPartialProps) {
  if (!region || region.enabled === false) return null;

  return (
    <div className="bg-white">
      <RegionRenderer region={region} />
    </div>
  );
}
