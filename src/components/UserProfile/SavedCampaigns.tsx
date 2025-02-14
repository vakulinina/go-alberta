'use client'

import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { getUserSavedCampaigns } from '@/api/userApi'
import { Campaign } from '@/types/campaign'
import { useAuth } from '@/context/AuthContext'
import { Spinner } from '@/components/Spinner'

export function SavedCampaigns() {
  const { user, loading } = useAuth()
  const userId = user?.userId
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleRemoveCampaign = (campaignId: number) => {
    setCampaigns((prev) => prev.filter((c) => c.campaignId !== campaignId))
  }

  useEffect(() => {
    if (!userId) return

    const fetchSavedCampaigns = async () => {
      try {
        const data = await getUserSavedCampaigns(userId)
        setCampaigns(data)
      } catch (error) {
        console.error('Failed to fetch saved campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedCampaigns()
  }, [userId])

  if (loading || isLoading) return <Spinner className="mx-auto my-10" />

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="grid auto-rows-[450px] grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.campaignId}
            {...campaign}
            isBookmarked={true}
            onRemoveFromSavedList={handleRemoveCampaign}
          />
        ))}
      </div>
    </div>
  )
}
