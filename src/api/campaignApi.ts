import { Campaign, MediaItem, Perk, Qna, Comment } from '@/types/campaign'
import { Category, GetCampaignsParams, UpdateCampaignMediaRequest, UpdateCampaignMediaResponse } from './types'

if (!process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL) {
  throw new Error('API URL is not defined')
}

const BASE_URL = process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL

export const createCampaign = async (userId: number): Promise<Campaign> => {
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
  const { campaignId, userId, ...params } = campaign

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

export const getCampaignById = async (id: number, userId: number): Promise<Campaign | undefined> => {
  const urlSearchParams = new URLSearchParams({
    userId: userId.toString(),
  }).toString()

  const url = `${BASE_URL}/campaigns/${id}?${urlSearchParams}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status}`)
    }

    const campaign = await response.json()
    return campaign
  } catch (error) {
    throw error
  }
}

export const getCampaigns = async (params?: GetCampaignsParams): Promise<Campaign[]> => {
  const defaultParams = {
    campaignStatusId: 1,
  }

  const urlSearchParams = new URLSearchParams(
    Object.entries({ ...defaultParams, ...params }).map(([key, value]) => [key, value.toString()])
  )
  const url = `${BASE_URL}/campaigns?${urlSearchParams}`

  try {
    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns: ${response.status}`)
    }

    const campaigns: Campaign[] = await response.json()
    return campaigns
  } catch (error) {
    throw error
  }
}

export const getCampaignPerks = async (id: number, userId: number): Promise<Perk[]> => {
  const urlSearchParams = new URLSearchParams({
    userId: userId.toString(),
  }).toString()

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${id}/perks?${urlSearchParams}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch perks: ${response.status}`)
    }

    const perks = await response.json()
    return perks
  } catch (error) {
    throw error
  }
}

export const addPerk = async (campaignId: number, perk: Perk): Promise<Perk> => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/perk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perk),
    })

    if (!response.ok) {
      throw new Error(`Failed to add perk: ${response.status}`)
    }

    const addedPerk = await response.json()
    return addedPerk
  } catch (error) {
    throw error
  }
}

export const updatePerk = async (campaignId: number, perk: Perk): Promise<Perk> => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/perk/${perk.perkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perk),
    })

    if (!response.ok) {
      throw new Error(`Failed to update perk: ${response.status}`)
    }

    const updatedPerk = await response.json()
    return updatedPerk
  } catch (error) {
    throw error
  }
}

export const deletePerk = async (campaignId: number, perkId: number, userId: number): Promise<void> => {
  const params = {
    userId: userId.toString(),
  }

  const urlSearchParams = new URLSearchParams(params)

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/perk/${perkId}?${urlSearchParams}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete perk: ${response.status}`)
    }
  } catch (error) {
    throw error
  }
}

export const getCampaignQna = async (id: number, userId: number): Promise<Qna[]> => {
  const urlSearchParams = new URLSearchParams({
    userId: userId.toString(),
  }).toString()

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${id}/qna?${urlSearchParams}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch QnA: ${response.status}`)
    }

    const qna = await response.json()
    return qna
  } catch (error) {
    throw error
  }
}

export const updateCampaignQna = async (campaignId: number, qnaList: Qna[], userId: number): Promise<Qna> => {
  const params = {
    userId,
    qnaList,
  }

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/qna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`Failed to update QnA: ${response.status}`)
    }

    const updatedQna = await response.json()
    return updatedQna
  } catch (error) {
    throw error
  }
}

export const getCampaignMedia = async (
  id: number,
  userId: number
): Promise<{ imageId: number; imageType: number; imageUrl: string }[]> => {
  try {
    const urlSearchParams = new URLSearchParams({
      userId: userId.toString(),
    })

    const response = await fetch(`${BASE_URL}/campaigns/${id}/images?${urlSearchParams}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`)
    }

    const images = await response.json()
    return images
  } catch (error) {
    throw error
  }
}

export const updateCampaignMedia = async ({
  imageList,
  campaignId,
  userId,
}: UpdateCampaignMediaRequest): Promise<UpdateCampaignMediaResponse> => {
  try {
    const params = {
      userId,
      imageList,
    }

    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`Failed to add image: ${response.status}`)
    }

    const images = await response.json()

    return images
  } catch (error) {
    throw error
  }
}

export const deleteCampaignImage = async ({
  campaignId,
  imageId,
  userId,
}: {
  campaignId: Campaign['campaignId']
  imageId: MediaItem['imageId']
  userId: number
}) => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/image/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.status}`)
    }

    return response
  } catch (error) {
    throw error
  }
}

export const getCampaignCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns/categories`)

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    const categories = await response.json()
    return categories
  } catch (error) {
    throw error
  }
}

export const updateCampaignStatus = async (campaignId: number, statusId: number, userId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, statusId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update campaign status: ${response.status}`)
    }
  } catch (error) {
    throw error
  }
}

export const getMyCampaigns = async (userId: number) => {
  try {
    const params = new URLSearchParams({
      userId: userId.toString(),
      fUserId: userId.toString(),
      campaignStatusId: '-1',
    })

    const response = await fetch(`${BASE_URL}/campaigns?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user campaigns')
    }

    return response.json()
  } catch (error) {
    console.error('Error in getMyCampaigns:', error)

    throw error
  }
}

export const getCampaignComments = async (
  params: Pick<GetCampaignsParams, 'userId' | 'pageSize' | 'pageNum'>,
  campaignId: number
): Promise<Comment[]> => {
  try {
    const urlSearchParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, value.toString()]))

    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/comments?${urlSearchParams}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch campaign comments')
    }

    return response.json()
  } catch (error) {
    console.error('Error in getCampaignComments:', error)
    throw error
  }
}

export const addCampaignComment = async (comment: Comment, campaignId: number, userId: number) => {
  const params = {
    comment,
    userId,
  }

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error('Failed to add campaign comment')
    }

    return response.json()
  } catch (error) {
    console.error('Error in addCampaignComment:', error)
    throw error
  }
}
