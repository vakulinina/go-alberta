'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { createCampaign, getCampaign, updateCampaign } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'
import { useRouter } from 'next/navigation'

type StepConfig = { key: string; path: (id: number) => string }

type CampaignContextType = {
  campaign: Campaign | undefined
  currentStepIndex: number
  isLastStep: boolean
  isFirstStep: boolean
  setCampaign: (campaign: Campaign | undefined) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  initCampaign: () => Promise<Campaign | undefined>
  saveCampaign: (event: React.FormEvent<HTMLFormElement>, launch: boolean) => void
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

const stepConfig: StepConfig[] = [
  { key: 'step1', path: (id) => `/user/campaigns/${id}/edit/basic` },
  { key: 'step2', path: (id) => `/user/campaigns/${id}/edit/perks` },
  { key: 'step3', path: (id) => `/user/campaigns/${id}/edit/goals` },
]

export function CampaignProvider({ children, id }: { children: React.ReactNode; id?: number }) {
  const [campaign, setCampaign] = useState<Campaign | undefined>(undefined)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const isLastStep = currentStepIndex === stepConfig.length - 1

  useEffect(() => {
    if (id) {
      getCampaign(id).then((campaign) => setCampaign(campaign))
    }
  }, [id])

  const goToStep = useCallback(
    (index: number) => {
      if (!campaign) return

      if (index >= 0 && index < stepConfig.length) {
        setCurrentStepIndex(index)
        router.push(stepConfig[index].path(campaign.id))
      }
    },
    [campaign, router]
  )

  const nextStep = useCallback(() => goToStep(currentStepIndex + 1), [currentStepIndex, goToStep])

  const prevStep = useCallback(() => goToStep(currentStepIndex - 1), [currentStepIndex, goToStep])

  const initCampaign = useCallback(async () => {
    try {
      const campaign = await createCampaign({
        user_id: 2, // TODO: replace with real user ID later
      })

      if (!campaign) return

      setCampaign(campaign)

      return campaign
    } catch (error) {
      console.error('Failed to create campaign', error) // TODO: Show error to user
    }
  }, [])

  const saveCampaign = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, launch: boolean) => {
      event.preventDefault()

      if (!campaign?.id) {
        console.error('No campaign ID found')
        return
      }

      try {
        await updateCampaign({
          id: campaign.id,
          ...(launch && { campaign_status_id: 2 }),
        })

        if (isLastStep) {
          router.push('/user/campaigns/my')
        }

        nextStep()
      } catch (error) {
        console.error('Failed to update campaign', error) // TODO: Show error to user
      }
    },
    [campaign, isLastStep, nextStep, router]
  )

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        currentStepIndex,
        isLastStep: currentStepIndex === stepConfig.length - 1,
        isFirstStep: currentStepIndex === 0,
        initCampaign,
        saveCampaign,
        setCampaign,
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
