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
  media: [
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 1' },
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 2' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' },
    { type: 'video', src: 'https://player.vimeo.com/video/459221891', platform: 'vimeo' },
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 3' },
  ],
}

export const MOCK_CAMPAIGNS = new Array(9).fill(MOCK_CAMPAIGN).map((item, index) => ({
  ...item,
  id: (index + 1).toString(),
}))
