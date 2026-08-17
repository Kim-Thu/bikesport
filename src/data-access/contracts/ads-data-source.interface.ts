import type { AdsRecord } from "@/interfaces/ads.interface";

export interface AdsDataSource {
  getActiveByPlacement(placement: string): Promise<AdsRecord[]>;
}
