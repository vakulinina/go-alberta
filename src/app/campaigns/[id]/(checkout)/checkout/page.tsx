'use client'

import { use, useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/Inputs/Input'
import { Button } from '@/components/Button'
import { getCampaignById } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'
import { createFunding } from '@/api/fundingApi'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  amount: number
  selectedPerkId?: number
}

export default function CheckoutPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params)
  const { user, guestId } = useAuth()
  const [campaign, setCampaign] = useState<Campaign>()
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 0,
  })

  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaignById(id, user?.userId || guestId)
      setCampaign(campaignData)
    }

    fetchData()
  }, [guestId, id, user?.userId])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      try {
        await createFunding({
          campaignId: id,
          amount: formData.amount * 100,
        })
        setIsPaymentComplete(true)
      } catch (error) {
        console.error('Error creating funding:', error)
      }
    },
    [formData.amount, id]
  )

  if (!campaign) return null

  return (
    <div className="mx-auto px-[16px] py-[80px] sm:px-[60px] md:px-[60px]">
      <h1 className="mb-8 text-3xl">Back this project</h1>

      <div className="flex w-full max-w-[1200px] flex-col-reverse gap-20 md:flex-row">
        <div className="mb-8 basis-1/2">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            <p className="text-gray-600">{campaign.campaignDesc}</p>
          </div>
        </div>

        {/* {perks && perks.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl">Select a Perk (Optional)</h2>
          <div className="flex gap-4 overflow-x-auto">
            {perks.map((perk) => (
              <div
                key={perk.perkId}
                className={`cursor-pointer ${selectedPerkId === perk.perkId ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => setSelectedPerkId(perk.perkId)}
              >
                <PerkCard {...perk} />
              </div>
            ))}
          </div>
        </div>
      )} */}

        {isPaymentComplete ? (
          <div className="flex flex-col items-center">
            <h2 className="text-center text-2xl">✅ Payment Complete</h2>
            <p className="text-md text-center text-gray-500">
              Thank you for your investment! We will notify you when the campaign is funded.
            </p>
            <Link href={'/campaigns/'} className="mt-8">
              <Button>Explore more campaigns</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xl">Payment Amount*</label>
              <Input
                type="number"
                name="amount"
                placeholder="Enter amount"
                min={100}
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <p className="mt-1 text-sm text-gray-500">Minimum investment: $100</p>
            </div>

            <div>
              <label className="mb-2 block text-xl">Card Information</label>
              <div className="space-y-4">
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  pattern="[0-9]{16}"
                  maxLength={16}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex gap-4">
                  <Input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                    maxLength={5}
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    pattern="[0-9]{3,4}"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth>
              Complete Payment
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
