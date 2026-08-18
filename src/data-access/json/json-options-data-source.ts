import wpOption from "@/data/wp-option.json";
import type { OptionsDataSource } from "@/data-access/contracts/options-data-source.interface";
import type { SiteOptionsRecord } from "@/interfaces/options.interface";

const siteOptions = wpOption as SiteOptionsRecord;

export const jsonOptionsDataSource: OptionsDataSource = {
  async getSiteOptions() {
    return siteOptions;
  },
};
