import campaignData from "@/data/wp-campain.json";
import type { CampaignDataSource } from "@/data-access/contracts/campaign-data-source.interface";
import type { CampaignRecord } from "@/interfaces/campaign.interface";

const campaigns = campaignData.campaigns as CampaignRecord[];
const campaignById = new Map(campaigns.map((campaign) => [campaign._id, campaign]));
const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active");

export const jsonCampaignDataSource: CampaignDataSource = {
  async getById(campaignId) {
    return campaignById.get(campaignId) ?? null;
  },
  async getActive(limit) {
    return typeof limit === "number" ? activeCampaigns.slice(0, limit) : activeCampaigns;
  },
};
