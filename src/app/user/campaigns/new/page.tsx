'use client'

import { createCampaign } from '@/api/campaignApi'
import { Spinner } from '@/components/Spinner'

import { redirect } from 'next/navigation'

export default function NewCampaignPage() {
  createCampaign().then((campaign) => {
    if (campaign?.campaignId) redirect(`/user/campaigns/${campaign.campaignId}/edit/basic`)
  })

  return (
    <div className="flex h-[200px] items-center justify-center">
      <Spinner />
    </div>
  )
}
