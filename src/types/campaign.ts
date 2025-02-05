export type MediaItem = {
  imageId: number
  imageType: number
  imageUrl: string
}

export type Perk = {
  perkId?: number
  campaignId?: number
  perkText?: string
  perkAmount?: number
  perkImage?: string
  perkImageType?: string
  imageFile?: File
  perkImagePresignedUrl?: string
}

export type Comment = {
  id: string
  user: { name: string; imageUrl: string }
  date: string
  content: string
}

export type Campaign = {
  campaignId: number
  userId?: number
  campaignStatusId?: number
  title?: string
  campaignDesc?: string
  categoryId?: number
  amount?: string
  fundingTarget?: number
  coverPic?: string
  invests?: number
  days?: number
  startDate?: string
  endDate?: string
  media?: MediaItem[]
  perks?: Perk[]
  qnaList?: Qna[]
  comments?: Comment[]
  addUpdPic?: number
  picPresignedUrl?: string
  coverPicType?: string
}

export type Qna = { qnaId?: number; question?: string; answer?: string; createdAt?: string }
