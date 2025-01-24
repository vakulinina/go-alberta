'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { createCampaign, getCampaignById, updateCampaign } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'
import { useRouter } from 'next/navigation'
import { CampaignContextType, StepConfig } from './types'

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

const stepConfig: StepConfig[] = [
  { key: 'step1', path: (id) => `/user/campaigns/${id}/edit/basic` },
  { key: 'step2', path: (id) => `/user/campaigns/${id}/edit/perks` },
  { key: 'step3', path: (id) => `/user/campaigns/${id}/edit/goals` },
]

const INITIAL_CAMPAIGN_DATA: Campaign = {
  campaignId: 0,
  title: '',
  description: '',
  categoryId: 0,
  raised: 0,
  target: 0,
  coverPic: '',
  invests: 0,
  days: 0,
  startDate: '',
  endDate: '',
  media: [],
  perks: [],
  qna: [],
  comments: [],
}

export function CampaignProvider({ children, id }: { children: React.ReactNode; id: number }) {
  const [campaign, setCampaign] = useState<Campaign>(INITIAL_CAMPAIGN_DATA)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()
  const [formData, setFormData] = useState(campaign)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    },
    []
  )

  const isLastStep = currentStepIndex === stepConfig.length - 1

  useEffect(() => {
    getCampaignById(id).then((campaign) => {
      if (campaign) setCampaign(campaign)
    })
  }, [id])

  const goToStep = useCallback(
    (index: number) => {
      if (!campaign) return

      if (index >= 0 && index < stepConfig.length) {
        setCurrentStepIndex(index)
        router.push(stepConfig[index].path(campaign.campaignId))
      }
    },
    [campaign, router]
  )

  const nextStep = useCallback(() => goToStep(currentStepIndex + 1), [currentStepIndex, goToStep])

  const prevStep = useCallback(() => goToStep(currentStepIndex - 1), [currentStepIndex, goToStep])

  const initCampaign = useCallback(async () => {
    try {
      const campaign = await createCampaign()

      if (!campaign) return

      setCampaign(campaign)

      return campaign
    } catch (error) {
      throw new Error(`Failed to create campaign: ${error}`)
    }
  }, [])

  const saveCampaign = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!campaign?.campaignId) {
        throw new Error('No campaign ID found')
      }

      const changedFields = Object.keys(formData).reduce((acc, key) => {
        if (formData[key as keyof Campaign] !== campaign[key as keyof Campaign]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc[key] = formData[key]
        }
        return acc
      }, {} as Partial<Campaign>)

      if (Object.keys(changedFields).length === 0) {
        return
      }

      try {
        await updateCampaign({ ...changedFields, campaignId: campaign.campaignId })

        if (isLastStep) {
          router.push('/user/campaigns/my')
        }

        nextStep()
      } catch (error) {
        throw new Error(`Failed to save campaign: ${error}`)
      }
    },
    [campaign, formData, isLastStep, nextStep, router]
  )

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
      e.preventDefault()
      if (e.nativeEvent.submitter?.id === 'launch') {
      } else {
        // launchCampaign()
      }
      saveCampaign(e)
    },
    [saveCampaign]
  )

  return (
    <CampaignContext.Provider
      value={{
        formData,
        campaign,
        currentStepIndex,
        isLastStep: currentStepIndex === stepConfig.length - 1,
        isFirstStep: currentStepIndex === 0,
        initCampaign,
        saveCampaign,
        setCampaign,
        handleSubmit,
        handleChange,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}

// Send extra fields for now
// TODO: add error handling
// TODO: add loading state
// TODO: add field validation
// TODO: add handling fields that are not simple inputs
// TODO: is Context really needed here or can we just use a hook?
