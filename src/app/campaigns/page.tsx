import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import React from 'react'

const mockCampaigns = new Array(9).fill({
  id: 1,
  title: 'Campaign Title',
  description: 'Campaign Description',
  raised: 5750,
  total: 7500,
  imageUrl: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
  tags: ['tag', 'tag', 'tag'],
})

const CampaignsPage = async () => {
  return (
    <div className="px-[100px] py-[60px]">
      <div
        className="grid auto-cols-max justify-center gap-x-[30px] gap-y-[40px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
      >
        {mockCampaigns.map((campaign, index) => (
          <CampaignCard key={index} {...campaign} />
        ))}
      </div>
    </div>
  )
}

export default CampaignsPage
