import { RegionRenderer } from "@/components/RegionRenderer";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderTop({ region }: HeaderPartialProps) {
  if (!region || region.enabled === false) return null;

  return (
    <div className="bg-blue-600">
      <RegionRenderer region={region} rowClassName="justify-center" />
    </div>
  );
}
