import { Campaign } from '@/types/campaign'

export const MOCK_CAMPAIGN: Campaign = {
  id: '1',
  title: 'Campaign Title',
  description: 'Campaign Description',
  raised: 5220,
  total: 7500,
  imageUrl: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
}

export const MOCK_CAMPAIGNS = new Array(9).fill(MOCK_CAMPAIGN).map((item, index) => ({
  ...item,
  id: (index + 1).toString(),
}))
