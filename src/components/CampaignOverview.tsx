import React from 'react'
import { ProgressBar } from './ProgressBar'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'

interface CampaignOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  campaign: Campaign
  className?: string
  onInvest?: () => void
  onSave?: () => void
  onShare?: () => void
}

export const CampaignOverview = ({
  campaign: { raised, total, invests, days },
  className,
  onSave,
  onInvest,
  onShare,
}: CampaignOverviewProps) => {
  const percentage = Math.round((raised / total) * 100)

  return (
    <div
      className={cx(
        'right-0 top-[20px] box-border min-w-[520px] shrink-0 whitespace-nowrap border-[6px] border-[#BABABA] bg-[#FFFFFF] px-[40px] py-[30px]',
        className
      )}
    >
      <p className="text-[40px]">{`$${raised.toLocaleString()}`}</p>
      <p className="mb-[16px] text-[32px]">{`${percentage}% of $${total.toLocaleString()} raised`}</p>

      <ProgressBar percentage={percentage} className="!h-[17px]" />
      <div className="mb-[46px] flex justify-between text-[20px]">
        <p>{invests} Invests</p>
        <p>{days} days left</p>
      </div>

      <div className="flex">
        <div className="mr-[24px]">
          <p className="text-[32px] leading-[32px]">Invest</p>
          <p className="text-[20px] leading-[20px] text-[#8F8F8F]">Min $100</p>
        </div>
        <input type="number" className="w-full rounded-lg bg-[#F6F8FA] px-[16px] text-[20px]" min={0} placeholder="$" />
      </div>
      <div className="mt-[44px]">
        {/* TODO: replace buttons with reusable Button component when implemented */}
        <button
          className="w-full rounded-[10px] bg-[#000000] px-[30px] py-[10px] text-[20px] text-white"
          onClick={onInvest}
        >
          Back This Project
        </button>
        <div className="mt-[24px] flex gap-[8px]">
          <button
            className="w-full rounded-[10px] bg-[#000000] px-[30px] py-[10px] text-[20px] text-white"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="w-full rounded-[10px] bg-[#000000] px-[30px] py-[10px] text-[20px] text-white"
            onClick={onShare}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
