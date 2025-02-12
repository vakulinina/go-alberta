import { Campaign } from '@/types/campaign'

export type UpdateCampaignMediaResponse = {
  fileType: string
  imageId: number
  imageType: 0 | 1
  imageUrl: string
  oldImageUrl: string
  presignedUrl: string
}[]

export type UpdateCampaignMediaRequest = {
  userId: number
  imageList: {
    imageId?: number
    imageType: '0' | '1'
    imageUrl: string
    fileType: string
  }[]
  campaignId: Campaign['campaignId']
}
