import type { HeaderSlot } from "../interfaces/header.interface";
import { RegionRenderer } from "../components/RegionRenderer";

interface HeaderMainProps {
  region?: HeaderSlot;
}

export function HeaderMain({ region }: HeaderMainProps) {
  if (!region || region.enabled === false) return null;

  return (
    <div className="bg-white">
      <RegionRenderer region={region} rowClassName="min-h-20 gap-9 max-lg:gap-4 max-md:flex-wrap max-md:gap-3 max-md:py-3" />
    </div>
  );
}
