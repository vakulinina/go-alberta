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
  campaign: { raised = 0, funding_target = 0, invests, days },
  className,
  onSave,
  onInvest,
  onShare,
}: CampaignOverviewProps) => {
  const percentage = Math.round((raised / funding_target) * 100)

  return (
    <div
      className={cx(
        'right-0 top-[20px] box-border shrink-0 whitespace-nowrap border-[6px] border-[#C3E09C] bg-[#FFFFFF] px-[20px] py-[30px] lg:min-w-[420px] xl:min-w-[520px] xl:px-[40px]',
        className
      )}
    >
      <p className="text-[32px]">{`$${raised?.toLocaleString()}`}</p>
      <p className="mb-[16px] text-[32px]">{`${percentage}% of $${funding_target?.toLocaleString()} raised`}</p>

      <ProgressBar percentage={percentage} className="!h-[17px]" />
      <div className="mb-[46px] mt-[12px] flex justify-between text-[14px]">
        <p>{invests} Invests</p>
        <p>{days} days left</p>
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
