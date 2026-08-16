import type { HeaderTemplateProps } from "@/interfaces/header.interface";
import { HeaderBottom } from "../partials/HeaderBottom";
import { HeaderMain } from "../partials/HeaderMain";
import { HeaderTop } from "../partials/HeaderTop";

export function DefaultTemplate({ settings }: HeaderTemplateProps) {
  const top = settings.payload.find((region) => region.slot === "top");
  const main = settings.payload.find((region) => region.slot === "main");
  const bottom = settings.payload.find((region) => region.slot === "bottom");

  return (
    <>
      <HeaderTop region={top} />
      <header id="home" className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <HeaderMain region={main} />
        <HeaderBottom region={bottom} />
      </header>
    </>
  );
}
