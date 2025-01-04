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
  id: number
  user_id?: number
  campaign_status_id?: number
  title?: string
  description?: string
  category_id?: number
  raised?: number
  funding_target?: number
  cover_url?: string
  invests?: number
  days?: number
  start_date?: string
  end_date?: string
  media?: MediaItem[]
  perks?: Perk[]
  qna?: { question: string; answer: string }[]
  comments?: Comment[]
}
