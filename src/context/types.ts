/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campaign } from '@/types/campaign'

export type StepConfig = { key: string; path: (id: number) => string }

export type CampaignContextType = {
  formData: Campaign
  campaign: Campaign | undefined
  currentStepIndex: number
  isLastStep: boolean
  isFirstStep: boolean
  setCampaign: (campaign: Campaign) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  initCampaign: () => Promise<Campaign | undefined>
  saveCampaign: (event: React.FormEvent<HTMLFormElement>, launch: boolean) => void
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
}
