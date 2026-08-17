import type { SiteOptionsRecord } from "@/interfaces/options.interface";

export interface OptionsDataSource {
  getSiteOptions(): Promise<SiteOptionsRecord | null>;
}
