import React, { memo } from 'react'
import Image from 'next/image'
import { ProgressBar } from '../ProgressBar'
import { BookmarkButton } from './components/BookmarkButton'
import Link from 'next/link'
import { ShareButton } from './components/ShareButton'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'
import { EditButton } from './components/EditButton'

interface CampaignCardProps extends Campaign {
  className?: string
  isEditable?: boolean
}

export const CampaignCardComponent = ({
  campaignId,
  title = '',
  campaignDesc = '',
  amount = '',
  fundingTarget = 0,
  invests = 0,
  coverPic = '',
  className,
  isEditable = false,
  endDate = '',
}: CampaignCardProps) => {
  const amountNumber = parseFloat(amount)
  const coverPicUrl = coverPic ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + coverPic : undefined
  const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <Link
      href={`/campaigns/${campaignId}`}
      className={cx('group flex h-[450px] w-[255px] shrink-0 flex-col overflow-hidden', className)}
    >
      <div className="relative">
        {coverPicUrl ? (
          <Image alt="" width={255} height={255} src={coverPicUrl} className="h-[255px] w-[255px] object-cover" />
        ) : (
          <div className="flex h-[255px] w-[255px] items-center justify-center bg-gray-100" />
        )}

        {isEditable ? <EditButton href={`/user/campaigns/${campaignId}/edit/basic`} /> : <BookmarkButton />}
        <ShareButton />
      </div>

      <div className="min-h-[160px] bg-[#FFFFFF] px-[6px] pt-[12px] transition-all group-hover:translate-y-[-18px]">
        <div>
          <h3 className="line-clamp-2 min-h-[60px] text-ellipsis text-[20px]">{title}</h3>
          <p className="line-clamp-1 text-ellipsis text-[14px]">{campaignDesc}</p>
        </div>

        <div>
          <div className="mt-[20px] flex justify-between text-[14px] text-[#6A6A6A]">
            <p>Raised</p>
            <p>Total</p>
          </div>
          <ProgressBar percentage={Math.round((amountNumber / fundingTarget) * 100)} />
          <div className="mt-[6px] flex justify-between">
            <p className="text-[20px]">
              ${amountNumber.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
            <p className="text-[20px]">
              ${fundingTarget.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100">
            <div className="mt-[6px] flex justify-between text-[14px] text-[#6A6A6A]">
              <p>{invests} Invests</p>
              <p>{daysLeft} days left</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const CampaignCard = memo(CampaignCardComponent)
