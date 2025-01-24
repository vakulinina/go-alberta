export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  platform?: 'youtube' | 'vimeo'
}

export type Perk = {
  title: string
  description: string
  price: number
  shippingDate: string
  imageUrl: string
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
  campaign_status_id?: number
  title?: string
  description?: string
  categoryId?: number
  raised?: number
  target?: number
  coverPic?: string
  invests?: number
  days?: number
  startDate?: string
  endDate?: string
  media?: MediaItem[]
  perks?: Perk[]
  qna?: { question: string; answer: string }[]
  comments?: Comment[]
}
