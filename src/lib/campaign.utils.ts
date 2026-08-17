import campaignData from "@/data/wp-campain.json";
import type { CampaignRecord } from "@/interfaces/campaign.interface";

export function getCampaigns() {
  return campaignData.campaigns as CampaignRecord[];
}

export function getActiveCampaignById(campaignId: string) {
  return getCampaigns().find(
    (campaign) => campaign._id === campaignId && campaign.status === "active",
  ) ?? null;
}
