'use client'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'

export function SavedCampaigns() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="grid auto-rows-[450px] grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} className="flex justify-center" />
        ))}
      </div>
    </div>
  )
}
