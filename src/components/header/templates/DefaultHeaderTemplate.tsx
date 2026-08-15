import type { HeaderSettings } from "../interfaces/header.interface";
import { HeaderBottom } from "../partials/HeaderBottom";
import { HeaderMain } from "../partials/HeaderMain";
import { HeaderTop } from "../partials/HeaderTop";

interface DefaultHeaderTemplateProps {
  settings: HeaderSettings;
}

export function DefaultHeaderTemplate({ settings }: DefaultHeaderTemplateProps) {
  const top = settings.payload.find((region) => region.slot === "top");
  const main = settings.payload.find((region) => region.slot === "main");
  const bottom = settings.payload.find((region) => region.slot === "bottom");

  return (
    <>
      <HeaderTop region={top} />
      <HeaderMain region={main} />
      <HeaderBottom region={bottom} />
    </>
  );
}
