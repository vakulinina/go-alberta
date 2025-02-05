'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { PlayIcon } from './Icons/PlayIcon'
import { MediaItem } from '@/types/campaign'
import { getVideoEmbedUrl, getVideoThumbnail } from '@/utils/helpers'

interface MediaGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  mediaItems: MediaItem[]
}

if (!process.env.NEXT_PUBLIC_S3_BUCKET_URL) {
  throw new Error('S3_BUCKET_URL is not set')
}

const s3BucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL

export const MediaGallery = ({ mediaItems, className }: MediaGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderMainMedia = useCallback(() => {
    const { imageType, imageUrl } = mediaItems[selectedIndex]

    if (imageType === 0) {
      return (
        <Image
          width={800}
          height={450}
          src={s3BucketUrl + '/' + imageUrl}
          alt=""
          className="h-full w-full rounded-lg object-contain"
        />
      )
    } else if (imageType === 1) {
      return (
        <iframe
          className="h-full w-full rounded-lg"
          src={getVideoEmbedUrl(imageUrl)}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }
  }, [mediaItems, selectedIndex])

  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <div className="mb-4 aspect-video">{renderMainMedia()}</div>

      {mediaItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {mediaItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                selectedIndex === index ? 'border-[#80CD57]' : 'border-none'
              }`}
            >
              {item.imageType === 0 ? (
                <Image
                  src={s3BucketUrl + '/' + item.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  width={800}
                  height={450}
                />
              ) : (
                <div className="relative h-full w-full object-cover">
                  <Image
                    src={getVideoThumbnail(item.imageUrl)}
                    alt="Video preview"
                    width={800}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                  <PlayIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
