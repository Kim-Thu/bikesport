import type { HeaderTemplateProps } from "@/interfaces/header.interface";
import { StickyHeader } from "../StickyHeader";
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
      <StickyHeader>
        <HeaderMain region={main} />
        <HeaderBottom region={bottom} />
      </StickyHeader>
    </>
  );
}
