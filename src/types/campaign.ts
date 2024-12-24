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

export type Campaign = {
  id: string
  title: string
  description: string
  raised: number
  total: number
  imageUrl: string
  invests: number
  days: number
  media: MediaItem[]
  perks: Perk[]
}
