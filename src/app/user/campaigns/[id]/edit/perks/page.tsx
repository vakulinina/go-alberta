'use client'

import { Button } from '@/components/Button'
import { TextArea } from '@/components/TextArea'
import { Input } from '@/components/Inputs/Input'
import { useCampaign } from '@/context/CampaignContext'
import { Fragment } from 'react'

export default function CampaignEditPerksPage() {
  const { campaign } = useCampaign()

  const perks = campaign?.perks || []

  return (
    <>
      <p className="text-[20px]">This section is related to perk information. Create a list of perks to investors.</p>

      {perks.map((perk) => (
        <Fragment key={perk.title}>
          <label htmlFor="perk-name" className="mt-[42px] block text-[32px]">
            Perk Name*
          </label>
          <p className="mt-[16px] text-[20px]">Write a name for this perk.</p>
          <Input name="perk-name" placeholder="Perk Name" className="mt-[16px] w-full" defaultValue={perk.title} />

          <label htmlFor="image" className="mt-[42px] block text-[32px]">
            Perk Image*
          </label>
          <p className="mt-[16px] text-[20px]">Upload one image to appear at the top of your perk.</p>
          <Button className="mt-[16px]" variant="secondary">
            Upload Image
          </Button>

          <label htmlFor="perk-price" className="mt-[42px] block text-[32px]">
            Price*
          </label>
          <p className="mt-[16px] text-[20px]">What is the price for this perk?</p>
          <Input name="perk-price" placeholder="Amount" className="mt-[16px] w-full" defaultValue={perk.price} />

          <label htmlFor="awards" className="mt-[42px] block text-[32px]">
            Awards*
          </label>
          <p className="mt-[16px] text-[20px]">List the awards for this perk.</p>
          <TextArea name="awards" className="mt-[16px] w-full" defaultValue={perk.description} />

          <button type="button" className="pt-[6px] text-[20px] hover:text-[#131313C9]">
            ➕ Add more perks
          </button>
        </Fragment>
      ))}
    </>
  )
}
