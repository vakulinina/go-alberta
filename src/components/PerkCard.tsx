import { Perk } from '@/types/campaign'
import Image from 'next/image'
import { Button } from './Button'

export const PerkCard = ({ title, description, price, shippingDate, imageUrl }: Perk) => {
  return (
    <div className="w-[220px] pb-[12px]">
      <Image src={imageUrl} alt={title} className="w-full object-cover" width={220} height={220} />
      <div className="px-[16px] pb-[12px] pt-[24px]">
        <div>
          <h3 className="text-[20px]">{title}</h3>

          <p className="text-[20px]">
            {`$${price}`} <span className="text-[14px] text-[#6A6A6A]">CAD</span>
          </p>
          <p className="text-[14px]">{description}</p>
          <p className="text-[14px]">{`Shipping ${shippingDate}`}</p>

          <Button className="mt-[24px]">Get This Perk</Button>
        </div>
      </div>
    </div>
  )
}
