export type MediaItem = {
  imageId: number
  imageType: number
  imageUrl: string
}

export type Perk = {
  perkId?: number
  campaignId?: number
  perkTitle?: string
  perkText?: string
  perkAmount?: number
  perkImage?: string
  perkImageType?: string
  imageFile?: File
  perkImagePresignedUrl?: string
  userId?: number
}

export type Comment = {
  commentId?: number
  commenterName?: string
  createdAt?: string
  commentText: string
}

export type Campaign = {
  campaignId: number
  userId?: number
  campaignStatusId?: number
  title?: string
  campaignDesc?: string
  categoryId?: number
  amount?: number
  fundingTarget?: number
  coverPic?: string
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
  exist?: number
  funderCount?: number
}

export type Qna = { qnaId?: number; question?: string; answer?: string; createdAt?: string }
