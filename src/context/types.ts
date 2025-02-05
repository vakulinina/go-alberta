/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campaign, Perk, Qna } from '@/types/campaign'

export type StepConfig = { key: string; path: (id: number) => string }

type CampaignContextState = {
  campaign: Campaign
  currentStepIndex: number
  isLastStep: boolean
  isFirstStep: boolean
  categories: { categoryId: number; categoryName: string }[]
  loading: boolean
}

export type CampaignContextType = {
  state: CampaignContextState
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>, launch: boolean) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  uploadImages: (files: File[]) => Promise<void>
  removeImage: (index: number) => Promise<void>
  uploadCoverImage: (file: File) => Promise<void>
  handleQnaChange: (qnaList: Qna[]) => void
  uploadVideo: (url: string) => Promise<void>
  handlePerkChange: (index: number, perk?: Perk) => Promise<void>
}
