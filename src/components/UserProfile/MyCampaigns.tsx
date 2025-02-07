'use client'
import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { getMyCampaigns } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'

export function MyCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found in local storage.')
          return
        }

        const data = await getMyCampaigns(userId)
        setCampaigns(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyCampaigns()
  }, [])

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="grid auto-rows-[450px] grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.campaignId} {...campaign} className="flex justify-center" isEditable={true} />
        ))}
      </div>
    </div>
  )
}
