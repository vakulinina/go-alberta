import React from 'react'
import Image from 'next/image'
import { ProgressBar } from '../ProgressBar'
import { BookmarkButton } from './components/BookmarkButton'
import Link from 'next/link'
import { ShareButton } from './components/ShareButton'
import cx from 'classnames'
import { Campaign } from '@/types/campaign'
import { EditButton } from './components/EditButton'

// TODO: configure image optimization

interface CampaignCardProps extends Campaign {
  className?: string
  isEditable?: boolean
}

export const CampaignCard = ({
  campaignId,
  title = '',
  description = '',
  raised = 0,
  target = 0,
  invests = 0,
  days = 0,
  coverPic = '',
  className,
  isEditable = false,
}: CampaignCardProps) => {
  return (
    <Link
      href={`/campaigns/${campaignId}`}
      className={cx('group flex h-[450px] w-[255px] shrink-0 flex-col overflow-hidden', className)}
    >
      <div className="relative">
        {coverPic ? (
          // TODO: replace with real image url after image upload is implemented
          <Image alt="" width={255} height={255} src={`https://placehold.co/255x255/png`} />
        ) : (
          <div className="flex h-[255px] w-[255px] items-center justify-center bg-gray-100" />
        )}

        {isEditable ? <EditButton href={`/user/campaigns/${campaignId}/edit/basic`} /> : <BookmarkButton />}
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
          <ProgressBar percentage={Math.round((raised / target) * 100)} />
          <div className="mt-[6px] flex justify-between">
            <p className="text-[20px]">
              ${raised.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
            <p className="text-[20px]">
              ${target.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
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
