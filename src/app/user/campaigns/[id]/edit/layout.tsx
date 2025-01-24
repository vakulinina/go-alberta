'use client'

import { Button } from '@/components/Button'
import { CampaignProvider, useCampaign } from '../../../../../context/CampaignContext'
import { useParams } from 'next/navigation'

const CampaignForm = ({ children }: { children: React.ReactNode }) => {
  const { prevStep, handleSubmit, isLastStep, isFirstStep } = useCampaign()

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-[484px]">{children}</div>
      <div className="mt-[40px] flex justify-end gap-[20px]">
        {!isFirstStep && (
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button type="submit" id="save" name="save">
          {isLastStep ? 'Save' : 'Save and Continue'}
        </Button>
        {isLastStep && (
          <Button type="submit" id="launch" name="launch">
            Save and Launch
          </Button>
        )}
      </div>
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
