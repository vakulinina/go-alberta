'use client'

import { FileInput } from '@/components/FileInput'
import { Input } from '@/components/Inputs/Input'
import { useCampaign } from '@/context/CampaignContext'
import { Fragment, useCallback } from 'react'
import { ImageGalleryItem } from '@/components/ImageGallery'
import { Perk } from '@/types/campaign'
import { Button } from '@/components/Button'

interface PerkItemProps {
  perk: Perk
  index: number
  onRemove: (index: number) => void
  onChange: (index: number, perk: Perk) => void
}

const PerkItem = ({ perk, index, onRemove, onChange, ...props }: PerkItemProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      if (!perk.perkId) {
        onChange(index, { ...perk, [name]: value })
      }
    },
    [onChange, index, perk]
  )

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [onRemove, index])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      if (files && !perk.perkId) {
        const file = files[0]
        onChange(index, { ...perk, perkImageType: file.type, perkImage: file.name, imageFile: file })
      }
    },
    [onChange, index, perk]
  )

  const imageUrl = perk.imageFile
    ? URL.createObjectURL(perk.imageFile)
    : perk.perkId
      ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + perk.perkImage
      : ''

  return (
    <Fragment {...props}>
      <label htmlFor="perkText" className="mt-[42px] block text-[32px]">
        Perk Name*
      </label>
      <p className="mt-[16px] text-[20px]">Write a name for this perk.</p>
      <Input
        name="perkText"
        placeholder="Perk Name"
        className="mt-[16px] w-full"
        defaultValue={perk.perkText}
        onChange={handleChange}
        disabled={!!perk.perkId}
      />

      <label htmlFor="image" className="mt-[42px] block text-[32px]">
        Perk Image*
      </label>
      <p className="mt-[16px] text-[20px]">Upload one image to appear at the top of your perk.</p>
      {imageUrl ? (
        <ImageGalleryItem imageUrl={imageUrl} />
      ) : (
        <FileInput onChange={handleFileChange} label="Upload Image" id="perkImage" />
      )}

      <label htmlFor="perkAmount" className="mt-[42px] block text-[32px]">
        Price*
      </label>
      <p className="mt-[16px] text-[20px]">What is the price for this perk?</p>
      <Input
        name="perkAmount"
        placeholder="Amount"
        className="mt-[16px] w-full"
        defaultValue={perk.perkAmount === 0 ? '' : perk.perkAmount}
        type="number"
        min={0}
        onChange={handleChange}
        disabled={!!perk.perkId}
      />

      <Button type="button" className="mt-[42px]" onClick={handleRemove} variant="secondary">
        Remove Perk
      </Button>
    </Fragment>
  )
}

export default function CampaignEditPerksPage() {
  const {
    state: { campaign },
    handlePerkChange,
  } = useCampaign()
  const perks = campaign.perks ?? [{ perkText: '', perkImage: '', perkAmount: 0 }]

  const handleAddPerk = useCallback(() => {
    handlePerkChange(perks?.length || 0, { perkText: '', perkImage: '', perkAmount: 0 })
  }, [perks?.length, handlePerkChange])

  const handleRemovePerk = useCallback(
    (index: number) => {
      handlePerkChange(index)
    },
    [handlePerkChange]
  )

  return (
    <>
      <p className="text-[20px]">This section is related to perk information. Create a list of perks to investors.</p>

      {perks?.map((perk, index) => (
        <PerkItem key={index} perk={perk} index={index} onRemove={handleRemovePerk} onChange={handlePerkChange} />
      ))}

      <button type="button" className="mt-[42px] pt-[6px] text-[20px] hover:text-[#131313C9]" onClick={handleAddPerk}>
        ➕ Add more perks
      </button>
    </>
  )
}
