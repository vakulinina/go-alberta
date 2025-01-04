import { Campaign } from '@/types/campaign'

// interface Campaign but with id as optional

export const createCampaign = async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
  const id = Math.floor(Math.random() * 100)

  return { ...campaign, id }
}

export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  return { ...campaign }
}
