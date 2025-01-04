'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCampaign, updateCampaign } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'

type StepConfig = { key: string; path: (id: number) => string }

type CampaignContextType = {
  campaignId: number | null
  currentStepIndex: number
  isLastStep: boolean
  isFirstStep: boolean
  setCampaignId: (id: number | null) => void
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

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaignId, setCampaignId] = useState<number | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const isLastStep = currentStepIndex === stepConfig.length - 1

  // TODO: load campaign data from api and/or local storage

  const goToStep = useCallback(
    (index: number) => {
      if (!campaignId) return

      if (index >= 0 && index < stepConfig.length) {
        setCurrentStepIndex(index)
        router.push(stepConfig[index].path(campaignId))
      }
    },
    [campaignId, router]
  )

  const nextStep = useCallback(() => goToStep(currentStepIndex + 1), [currentStepIndex, goToStep])

  const prevStep = useCallback(() => goToStep(currentStepIndex - 1), [currentStepIndex, goToStep])

  const initCampaign = useCallback(async () => {
    try {
      const campaign = await createCampaign({
        user_id: 2, // TODO: replace with real user ID later
      })

      if (!campaign.id) return

      setCampaignId(campaign.id)

      return campaign
    } catch (error) {
      console.error('Failed to create campaign', error) // TODO: Show error to user
    }
  }, [setCampaignId])

  const saveCampaign = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, launch: boolean) => {
      event.preventDefault()

      if (!campaignId) {
        console.error('No campaign ID found')
        return
      }

      try {
        await updateCampaign({
          id: campaignId,
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
    [campaignId, isLastStep, nextStep, router]
  )

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        currentStepIndex,
        isLastStep: currentStepIndex === stepConfig.length - 1,
        isFirstStep: currentStepIndex === 0,
        initCampaign,
        saveCampaign,
        setCampaignId,
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
