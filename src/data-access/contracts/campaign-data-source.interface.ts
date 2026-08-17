import type { CampaignRecord } from "@/interfaces/campaign.interface";

export interface CampaignDataSource {
  getById(campaignId: string): Promise<CampaignRecord | null>;
  getActive(limit?: number): Promise<CampaignRecord[]>;
}
