import { Perk } from '@/types/campaign'
import Image from 'next/image'
import { Button } from './Button'

export const PerkCard = ({ perkAmount, perkImage, perkText }: Perk) => {
  return (
    <div className="w-[220px] pb-[12px]">
      {perkImage && (
        <Image src={perkImage} alt="" className="h-[220px] w-[220px] object-cover" width={220} height={220} />
      )}
      <div className="px-[16px] pb-[12px] pt-[24px]">
        <div>
          <h3 className="text-[20px]">{perkText}</h3>

          <p className="text-[20px]">
            {/* TODO: calculate the amount */}
            {`$${perkAmount}`} <span className="text-[14px] text-[#6A6A6A]">CAD</span>
          </p>

          <Button className="mt-[24px]">Get This Perk</Button>
        </div>
      </div>
    </div>
  )
}
