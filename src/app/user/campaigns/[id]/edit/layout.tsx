'use client'

import { Button } from '@/components/Button'
import { CampaignProvider, useCampaign } from '../../../../../context/CampaignContext'
import { useParams } from 'next/navigation'
import { Spinner } from '@/components/Spinner'
import { useCallback } from 'react'

const CampaignForm = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { campaign, isLastStep, isFirstStep, loading },
    prevStep,
    handleSubmit,
  } = useCampaign()

  const handleSave = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
      if (e.nativeEvent.submitter?.id === 'save') {
        handleSubmit(e, false)
      } else {
        handleSubmit(e, true)
      }
    },
    [handleSubmit]
  )

  if (!campaign?.campaignId)
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Spinner />
      </div>
    )

  if (campaign.campaignStatusId !== 1) {
    return <div className="p-8 text-center">Campaign can not be edited</div>
  }

  return (
    <form onSubmit={handleSave} className="relative">
      <div className="max-w-[484px]">{children}</div>

      <div className="mt-[40px] flex justify-end gap-[20px]">
        {!isFirstStep && (
          <Button type="button" variant="secondary" onClick={prevStep} loading={loading}>
            Back
          </Button>
        )}
        <Button type="submit" id="save" name="save" loading={loading}>
          {isLastStep ? 'Save' : 'Save and Continue'}
        </Button>
        {isLastStep && (
          <Button type="submit" id="launch" name="launch" loading={loading}>
            Save and Launch
          </Button>
        )}
      </div>

      {loading && <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-white/50" />}
    </form>
  )
}

export default function NewCampaignLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams()

  return (
    <CampaignProvider id={Number(id)}>
      <CampaignForm>{children}</CampaignForm>
    </CampaignProvider>
  )
}
