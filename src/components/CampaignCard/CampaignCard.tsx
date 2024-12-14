import React from 'react'
import Image from 'next/image'
import { ProgressBar } from '../ProgressBar'
import { BookmarkButton } from './components/BookmarkButton'
import Link from 'next/link'
import { ShareButton } from './components/ShareButton'

// TODO: configure image optimization

interface CampaignCardProps {
  id: number
  title: string
  description: string
  raised: number
  total: number
  imageUrl: string
  invests: number
  days: number
  tags: string[]
}

export const CampaignCard = ({
  id,
  title,
  description,
  raised,
  total,
  invests,
  days,
  tags,
  imageUrl,
}: CampaignCardProps) => {
  return (
    <Link href={`/campaigns/${id}`} className="group relative h-[409px] w-[255px] overflow-hidden">
      <div className="relative">
        <Image alt="" width={255} height={255} src={imageUrl} />
        <BookmarkButton />
        <ShareButton></ShareButton>
      </div>

      <div className="absolute bottom-0 left-0 right-0 min-h-[160px] translate-y-[62px] bg-[#FFFFFF] pb-[10px] pt-[20px] transition-all group-hover:translate-y-0">
        <div>
          <h3 className="line-clamp-2 text-ellipsis text-[20px]">{title}</h3>
          <p className="line-clamp-2 text-ellipsis text-[14px]">{description}</p>
        </div>

        <div>
          <div className="flex justify-between text-[14px] text-[#6A6A6A]">
            <p>Raised</p>
            <p>Total</p>
          </div>
          <ProgressBar percentage={Math.round((raised / total) * 100)} />
          <div className="mt-[6px] flex justify-between">
            <p className="text-[20px]">
              ${raised.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
            <p className="text-[20px]">
              ${total.toLocaleString()} <span className="text-[10px] text-[#6A6A6A]">CAD</span>
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100">
            <div className="mt-[6px] flex justify-between text-[14px] text-[#6A6A6A]">
              <p>{invests} Invests</p>
              <p>{days} days left</p>
            </div>
            {tags.length > 0 && (
              <div className="mt-[22px] flex gap-[10px]">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="box-border rounded-[2px] border border-[#C8C8C8] px-[6px] py-[1px] text-[12px] uppercase text-[#6A6A6A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
