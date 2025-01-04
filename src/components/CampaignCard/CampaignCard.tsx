import React from 'react'
import Image from 'next/image'
import { ProgressBar } from '../ProgressBar'
import { BookmarkButton } from './components/BookmarkButton'
import Link from 'next/link'
import { ShareButton } from './components/ShareButton'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'

// TODO: configure image optimization

interface CampaignCardProps extends Campaign {
  className?: string
}

export const CampaignCard = ({
  id,
  title = '',
  description = '',
  raised = 0,
  funding_target = 0,
  invests = 0,
  days = 0,
  cover_url = '',
  className,
}: CampaignCardProps) => {
  return (
    <Link
      href={`/campaigns/${id}`}
      className={cx('group flex h-[450px] w-[255px] shrink-0 flex-col overflow-hidden', className)}
    >
      <div className="relative">
        <Image alt="" width={255} height={255} src={cover_url} />
        <BookmarkButton />
        <ShareButton />
      </div>

      <div className="min-h-[160px] bg-[#FFFFFF] px-[6px] pt-[12px] transition-all group-hover:translate-y-[-18px]">
        <div>
          <h3 className="line-clamp-2 min-h-[60px] text-ellipsis text-[20px]">{title}</h3>
          <p className="line-clamp-1 text-ellipsis text-[14px]">{description}</p>
        </div>

        <div>
          <div className="mt-[20px] flex justify-between text-[14px] text-[#6A6A6A]">
            <p>Raised</p>
            <p>Total</p>
          </div>
          <ProgressBar percentage={Math.round((raised / funding_target) * 100)} />
          <div className="mt-[6px] flex justify-between">
            <p className="text-[20px]">
              ${raised.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
            <p className="text-[20px]">
              ${funding_target.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100">
            <div className="mt-[6px] flex justify-between text-[14px] text-[#6A6A6A]">
              <p>{invests} Invests</p>
              <p>{days} days left</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
