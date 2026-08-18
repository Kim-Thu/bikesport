import { dataSources } from "@/data-access/data-sources";
import type { SiteOptionsRecord } from "@/interfaces/options.interface";
import { cachedDomain } from "@/lib/cache.utils";

export async function getSiteOptions(): Promise<SiteOptionsRecord> {
  return cachedDomain(
    "options",
    ["site-options"],
    async () => {
      const options = await dataSources.options.getSiteOptions();
      if (!options) throw new Error("Site options are not configured.");
      return options;
    },
  );
}
