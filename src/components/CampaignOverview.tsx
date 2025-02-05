import React from 'react'
import { ProgressBar } from './ProgressBar'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'
import { Button } from './Button'
import { Input } from './Inputs/Input'

interface CampaignOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  campaign: Campaign
  className?: string
  onInvest?: () => void
  onSave?: () => void
  onShare?: () => void
}

export const CampaignOverview = ({
  campaign: { amount = '', fundingTarget = 0, invests, endDate },
  className,
  onSave,
  onInvest,
  onShare,
}: CampaignOverviewProps) => {
  const amountNumber = parseFloat(amount)
  const percentage = Math.round((amountNumber / fundingTarget) * 100)
  const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div
      className={cx(
        'right-0 top-[20px] box-border shrink-0 whitespace-nowrap border-[6px] border-[#C3E09C] bg-[#FFFFFF] px-[20px] py-[30px] lg:min-w-[420px] xl:min-w-[520px] xl:px-[40px]',
        className
      )}
    >
      <p className="text-[32px]">{`$${amountNumber?.toLocaleString()}`}</p>
      <p className="mb-[16px] text-[32px]">{`${percentage}% of $${fundingTarget?.toLocaleString()} raised`}</p>

      <ProgressBar percentage={percentage} className="!h-[17px]" />
      <div className="mb-[46px] mt-[12px] flex justify-between text-[14px]">
        <p>{invests || 0} Invests</p>
        <p>{daysLeft} days left</p>
      </div>

      <div className="flex">
        <div className="mr-[24px]">
          <p className="text-[20px] leading-[32px]">Invest</p>
          <p className="text-[14px] leading-[20px] text-[#8F8F8F]">Min $100</p>
        </div>
        <Input type="number" min={0} placeholder="$" />
      </div>
      <div className="mt-[44px]">
        <Button fullWidth onClick={onInvest}>
          Back This Project
        </Button>
        <div className="mt-[24px] flex gap-[8px]">
          <Button fullWidth onClick={onSave} variant="secondary">
            Save
          </Button>
          <Button fullWidth onClick={onShare} variant="secondary">
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
