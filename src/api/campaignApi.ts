import { Campaign } from '@/types/campaign'

if (!process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL) {
  throw new Error('API URL is not defined')
}

const BASE_URL = process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL
// const userId = getUUID()
const userId = 3 // mock id, switch to uuid or authenticated user id later

export const createCampaign = async (): Promise<Campaign> => {
  const params = {
    userId,
  }

  try {
    const response = await fetch(`${BASE_URL}/campaigns/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`Failed to create campaign: ${response.status}`)
    }

    const createdCampaign: Campaign = await response.json()
    return createdCampaign
  } catch (error) {
    throw error
  }
}

export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const { campaignId, ...params } = campaign

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, userId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update campaign: ${response.status}`)
    }

    const updatedCampaign: Campaign = await response.json()
    return updatedCampaign
  } catch (error) {
    throw error
  }
}

export const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
  const urlSearchParams = new URLSearchParams({
    userId: userId.toString(),
  }).toString()

  const url = `${BASE_URL}/campaigns/${id}?${urlSearchParams}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status}`)
    }

    const campaigns: Campaign[] = await response.json()
    return campaigns[0]
  } catch (error) {
    throw error
  }
}

export const getCampaigns = async (): Promise<Campaign[]> => {
  const params = {
    userId: userId.toString(),
    campaignStatusId: (1).toString(), // TODO: move to params
    pageSize: (10).toString(),
    pageNum: (1).toString(),
  }

  const urlSearchParams = new URLSearchParams(params).toString()
  const url = `${BASE_URL}/campaigns?${urlSearchParams}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns: ${response.status}`)
    }

    const campaigns: Campaign[] = await response.json()
    return campaigns
  } catch (error) {
    throw error
  }
}
