import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type { SiteOptionsRecord } from "@/interfaces/options.interface";

export const getSiteOptions = cache(async (): Promise<SiteOptionsRecord> => {
  const options = await dataSources.options.getSiteOptions();
  if (!options) throw new Error("Site options are not configured.");
  return options;
});
