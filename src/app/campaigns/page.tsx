import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'
import React from 'react'

const CampaignsPage = async () => {
  return (
    <div className="px-[100px] py-[60px]">
      <div
        className="grid auto-cols-max justify-center gap-x-[30px] gap-y-[40px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
      >
        {MOCK_CAMPAIGNS.map((campaign, index) => (
          <CampaignCard key={index} {...campaign} />
        ))}
      </div>
    </div>
  )
}

export default CampaignsPage
