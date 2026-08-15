import type { HeaderSlot } from "../interfaces/header.interface";
import { RegionRenderer } from "../components/RegionRenderer";

interface HeaderTopProps {
  region?: HeaderSlot;
}

export function HeaderTop({ region }: HeaderTopProps) {
  if (!region || region.enabled === false) return null;

  return (
    <div className="bg-blue-600">
      <RegionRenderer region={region} rowClassName="justify-center" />
    </div>
  );
}
