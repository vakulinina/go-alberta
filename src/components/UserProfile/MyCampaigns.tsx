'use client'
import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { getMyCampaigns } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'

export function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) return

        const data = await getMyCampaigns(userId)
        setCampaigns(data)
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyCampaigns()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="grid auto-rows-[450px] grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {campaigns.map((campaign: Campaign) => (
          <CampaignCard key={campaign.campaignId} {...campaign} className="flex justify-center" isEditable={true} />
        ))}
      </div>
    </div>
  )
}
