import type { CampaignRecord } from "@/interfaces/campaign.interface";

export interface CampaignDataSource {
  getById(campaignId: string): Promise<CampaignRecord | null>;
  getAll(): Promise<CampaignRecord[]>;
  getActive(limit?: number): Promise<CampaignRecord[]>;
}
