'use client'

import { createCampaign } from '@/api/campaignApi'

import { redirect } from 'next/navigation'

export default function NewCampaignPage() {
  createCampaign({
    user_id: 2, // TODO: replace with real user ID later
  }).then((campaign) => {
    if (campaign?.id) redirect(`/user/campaigns/${campaign.id}/edit/basic`)
  })

  // TODO: maybe return loader
}
