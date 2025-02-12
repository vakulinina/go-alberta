import { CampaignReviewType } from '@/types/admin'

const BASE_URL = process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL

if (!BASE_URL) {
  throw new Error('API URL is not defined')
}

export const adminApi = {
  async getCampaignReviews(): Promise<CampaignReviewType[]> {
    const response = await fetch(`${BASE_URL}/campaigns?userId=-1&campaignStatusId=2`, {
      method: 'GET',
      //  credentials: 'include',
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch campaigns')
    }
    return response.json()
  },

  async updateCampaignStatus(campaignId: string, userId: number, campaignStatusId: number, adminMessage?: string) {
    const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/status`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, campaignStatusId, adminMessage }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update campaign status: ${errorText}`)
    }

    try {
      return await response.json()
    } catch {
      throw new Error('Failed to parse server response as JSON')
    }
  },
}
