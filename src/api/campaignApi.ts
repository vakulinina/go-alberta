import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'
import { Campaign } from '@/types/campaign'

export const createCampaign = async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
  const id = Math.floor(Math.random() * 100)

  return { ...campaign, id }
}

export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  return { ...campaign }
}

export const getCampaign = async (id: number): Promise<Campaign | undefined> => {
  const campaign = MOCK_CAMPAIGNS.find((campaign) => campaign.id === id)

  return campaign
}
