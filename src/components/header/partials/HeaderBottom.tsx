import type { HeaderSlot } from "../interfaces/header.interface";
import { RegionRenderer } from "../components/RegionRenderer";

interface HeaderBottomProps {
  region?: HeaderSlot;
}

export function HeaderBottom({ region }: HeaderBottomProps) {
  if (!region || region.enabled === false) return null;

  return (
    <div className="bg-white">
      <RegionRenderer region={region} />
    </div>
  );
}
