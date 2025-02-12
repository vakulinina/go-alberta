'use client'
import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { getMyCampaigns } from '@/api/campaignApi'
import { Campaign } from '@/types/campaign'
import { Spinner } from '../Spinner'
import { useAuth } from '@/context/AuthContext'

export function MyCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        if (!user?.userId) {
          setError('User ID not found in local storage.')
          return
        }

        const data = await getMyCampaigns(user.userId)
        setCampaigns(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyCampaigns()
  }, [user?.userId])

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="grid auto-rows-[450px] grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.campaignId}
            {...campaign}
            className="flex justify-center"
            isEditable={campaign.campaignStatusId === 1}
          />
        ))}
      </div>
    </div>
  )
}
