import React from 'react'
import { ProgressBar } from '../ProgressBar'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'
import { Button } from '../Button'
import { Input } from '../Inputs/Input'
import Link from 'next/link'
import { CampaignShareButton } from './CampaignShareButton'

interface CampaignOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  campaign: Campaign
  className?: string
  onInvest?: () => void
  onSave?: () => void
  onShare?: () => void
}

export const CampaignOverview = ({
  campaign: { amount = 0, fundingTarget = 0, invests, endDate, campaignId },
  className,
  onSave,
  onShare,
}: CampaignOverviewProps) => {
  const fundingTargetInDollars = Math.round(fundingTarget / 100)
  const amountInDollars = Math.round(amount / 100)
  const percentage = fundingTargetInDollars > 0 ? Math.round((amountInDollars / fundingTargetInDollars) * 100) : 0
  const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div
      className={cx(
        'right-0 top-[20px] box-border shrink-0 whitespace-nowrap border-[6px] border-[#C3E09C] bg-[#FFFFFF] px-[20px] py-[30px] lg:min-w-[420px] xl:min-w-[520px] xl:px-[40px]',
        className
      )}
    >
      <p className="text-[32px]">{`$${amountInDollars.toLocaleString()}`}</p>
      <p className="mb-[16px] text-[32px]">{`${percentage}% of $${fundingTargetInDollars.toLocaleString()} raised`}</p>

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
        <Link href={`/campaigns/${campaignId}/checkout`}>
          <Button fullWidth>Back This Project</Button>
        </Link>
        <div className="mt-[24px] flex gap-[8px]">
          <Button fullWidth onClick={onSave} variant="secondary">
            Save
          </Button>
          <CampaignShareButton
            campaignId={campaignId}
            onShare={onShare}
            buttonProps={{ fullWidth: true, variant: 'secondary', children: 'Share' }}
          />
        </div>
      </div>
    </div>
  )
}
