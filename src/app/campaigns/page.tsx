import { getCampaigns } from '@/api/campaignApi'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import React from 'react'

const CampaignsPage = async () => {
  const campaigns = await getCampaigns() //TODO:update request to only get campaigns that are active

  return (
    <div className="px-[100px] py-[60px]">
      {campaigns.length === 0 && <p className="text-center">Check back soon - exciting campaigns are on the way!</p>}
      <div
        className="grid auto-cols-max justify-center gap-x-[30px] gap-y-[40px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
      >
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.campaignId} {...campaign} />
        ))}
      </div>
    </div>
  )
}

export default CampaignsPage
