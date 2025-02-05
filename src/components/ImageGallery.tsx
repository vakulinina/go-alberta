import { MediaItem } from '@/types/campaign'
import Image from 'next/image'
import { XmarkIcon } from './Icons/XmarkIcon'

export const ImageGalleryItem = ({ imageUrl, onRemove }: { imageUrl: string; onRemove?: () => void }) => {
  return (
    <div className="relative shrink-0">
      <Image src={imageUrl} alt="Selected" width={112} height={112} className="h-[112px] w-[112px] object-cover" />
      {onRemove && (
        <button
          className="text-md absolute right-0 top-0 h-[40px] w-[40px] rounded bg-[#582F93] p-1 text-white hover:bg-[#51236d]"
          onClick={(e) => {
            e.preventDefault()
            onRemove()
          }}
        >
          <XmarkIcon />
        </button>
      )}
    </div>
  )
}

export const ImageGallery = ({ media, onRemove }: { media: MediaItem[]; onRemove: (index: number) => void }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {media.map(({ imageUrl }, index) => (
        <ImageGalleryItem key={index} imageUrl={imageUrl} onRemove={() => onRemove(index)} />
      ))}
    </div>
  )
}
