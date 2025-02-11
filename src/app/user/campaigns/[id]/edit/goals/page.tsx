'use client'

import { DateInput } from '@/components/Inputs/DateInput'
import { Input } from '@/components/Inputs/Input'
import { Toast } from '@/components/Toast'
import { useCampaign } from '@/context/CampaignContext'

export default function CampaignEditGoalsPage() {
  const {
    state: { campaign },
    errors,
    handleChange,
  } = useCampaign()

  const fundingTarget = campaign.fundingTarget ? Math.round(campaign.fundingTarget / 100) : 0

  return (
    <>
      <p className="text-[20px]">
        This section is related to campaign goals. Talk about your requirements to investors.
      </p>

      <label htmlFor="fundingTarget" className="mt-[42px] block text-[32px]">
        Funding Requirement*
      </label>
      <p className="mt-[16px] text-[20px]">What is the amount of fund you need to launch your campaign?</p>
      <Input
        name="fundingTarget"
        placeholder="Amount"
        className="mt-[16px] w-full"
        defaultValue={fundingTarget}
        onChange={handleChange}
        type="number"
        min={0}
        error={errors.fundingTarget}
      />

      <label htmlFor="startDate" className="mt-[42px] block text-[32px]">
        Launch Date*
      </label>
      <p className="mt-[16px] text-[20px]">Choose a start date for your campaign.</p>
      <DateInput
        name="startDate"
        placeholder="MM/DD/YYYY"
        className="mt-[16px] w-full"
        onChange={handleChange}
        value={campaign.startDate}
        error={errors.startDate}
      />

      <label htmlFor="endDate" className="mt-[42px] block text-[32px]">
        Ending Date*
      </label>
      <p className="mt-[16px] text-[20px]">Choose an ending date for your campaign.</p>
      <DateInput
        name="endDate"
        placeholder="MM/DD/YYYY"
        className="mt-[16px] w-full"
        onChange={handleChange}
        value={campaign.endDate}
        error={errors.endDate}
      />

      {errors.general && <Toast message={errors.general} variant="error" />}
    </>
  )
}
