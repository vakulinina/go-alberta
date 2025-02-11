import { Campaign } from '@/types/campaign'
import { StepConfig } from './types'

export const INITIAL_PERK_DATA = {
  perkId: 0,
  campaignId: 0,
  perkText: '',
  perkAmount: 0,
  perkImageUrl: '',
}

export const INITIAL_QNA_DATA = {
  qnaId: 0,
  question: '',
  answer: '',
  createdAt: '',
}

export const INITIAL_CAMPAIGN_DATA: Campaign = {
  campaignId: 0,
  title: '',
  campaignDesc: '',
  categoryId: 0,
  amount: 0,
  fundingTarget: 0,
  coverPic: '',
  invests: 0,
  days: 0,
  startDate: '',
  endDate: '',
  media: [],
  perks: [],
  qnaList: [],
  comments: [],
}

export const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const INVALID_IMAGE_ERROR = 'Only image files (JPEG, PNG, WEBP) under 150KB are allowed'
export const VALID_IMAGE_SIZE = 150 * 1024
export const isValidImageFormat = (file: File) => VALID_IMAGE_TYPES.includes(file.type)
export const isValidImageSize = (file: File) => file.size < VALID_IMAGE_SIZE

export const stepConfig: StepConfig[] = [
  { key: 'step1', path: (id) => `/user/campaigns/${id}/edit/basic` },
  { key: 'step2', path: (id) => `/user/campaigns/${id}/edit/perks` },
  { key: 'step3', path: (id) => `/user/campaigns/${id}/edit/goals` },
]

export const REQUIRED_FIELDS = {
  title: 'Title',
  campaignDesc: 'Description',
  categoryId: 'Category',
  fundingTarget: 'Funding requirement',
  coverPic: 'Card image',
  startDate: 'Start date',
  endDate: 'End date',
  media: 'Image Gallery',
  qnaList: 'Q&A',
  perks: 'Perks',
} as const
