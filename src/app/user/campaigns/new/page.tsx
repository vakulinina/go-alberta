'use client'

import { createCampaign } from '@/api/campaignApi'

import { redirect } from 'next/navigation'

export default function NewCampaignPage() {
  createCampaign().then((campaign) => {
    if (campaign?.campaignId) redirect(`/user/campaigns/${campaign.campaignId}/edit/basic`)
  })

  // TODO: maybe return loader
}
