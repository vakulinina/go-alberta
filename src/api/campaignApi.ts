import { Campaign, MediaItem, Perk, Qna } from '@/types/campaign'
import { UpdateCampaignMediaRequest, UpdateCampaignMediaResponse } from './types'

if (!process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL) {
  throw new Error('API URL is not defined')
}

const BASE_URL = process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL
// const userId = getUUID()
const userId = 38 // mock id, switch to uuid or authenticated user id later

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

    const campaign = await response.json()
    return campaign
  } catch (error) {
    throw error
  }
}

type GetCampaignsParams = {
  campaignStatusId?: number
  pageSize?: number
  pageNum?: number
}

export const getCampaigns = async (params?: GetCampaignsParams): Promise<Campaign[]> => {
  const defaultParams = {
    userId: userId,
    campaignStatusId: 1,
  }
  const urlSearchParams = new URLSearchParams(
    Object.entries({ ...defaultParams, ...params }).map(([key, value]) => [key, value.toString()])
  )
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

export const getCampaignPerks = async (id: number): Promise<Perk[]> => {
  const params = {
    userId: userId.toString(),
  }

  const urlSearchParams = new URLSearchParams(params).toString()

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
  const params = {
    userId,
    ...perk,
  }

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/perk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
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
  const params = {
    userId,
    ...perk,
  }

  try {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/perk/${perk.perkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
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

export const deletePerk = async (campaignId: number, perkId: number): Promise<void> => {
  const params = {
    userId: userId.toString(),
  }

  const urlSearchParams = new URLSearchParams(params).toString()

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

export const getCampaignQna = async (id: number): Promise<Qna[]> => {
  const params = {
    userId: userId.toString(),
  }

  const urlSearchParams = new URLSearchParams(params).toString()

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

export const updateCampaignQna = async (campaignId: number, qnaList: Qna[]): Promise<Qna> => {
  const params = { userId, qnaList }

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
  id: number
): Promise<{ imageId: number; imageType: number; imageUrl: string }[]> => {
  const params = {
    userId: userId.toString(),
  }

  const urlSearchParams = new URLSearchParams(params).toString()

  try {
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
}: UpdateCampaignMediaRequest): Promise<UpdateCampaignMediaResponse> => {
  const params = {
    userId,
    imageList,
  }

  try {
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

export const uploadImageToS3 = async (
  presignedUrl: string,
  imageFile: File | Blob
): Promise<{ ok: boolean; url: string }> => {
  try {
    if (!presignedUrl || !imageFile) {
      throw new Error('Presigned URL and image file are required')
    }

    if (!(imageFile instanceof File) && !(imageFile instanceof Blob)) {
      throw new Error('imageFile must be a File or Blob object')
    }

    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: imageFile,
      headers: {
        'Content-Type': imageFile.type || 'application/octet-stream',
      },
    })

    if (!response.ok) {
      throw new Error(`Image upload failed with status: ${response.status}`)
    }

    return {
      ok: response.ok,
      url: response.url.split('?')[0],
    }
  } catch (error) {
    throw error
  }
}

export const deleteCampaignImage = async ({
  campaignId,
  imageId,
}: {
  campaignId: Campaign['campaignId']
  imageId: MediaItem['imageId']
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

export const getCampaignCategories = async (): Promise<{ categoryId: number; categoryName: string }[]> => {
  const response = await fetch(`${BASE_URL}/campaigns/categories`)

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`)
  }

  const categories = await response.json()
  return categories
}

export const updateCampaignStatus = async (campaignId: number, statusId: number): Promise<void> => {
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
}
