'use client'

import { useCampaign } from '@/context/CampaignContext'
import { redirect, useParams } from 'next/navigation'

export default function NewCampaignPage() {
  const { id } = useParams()
  const { initCampaign } = useCampaign()

  if (!id) {
    initCampaign().then((campaign) => {
      if (campaign?.id) redirect(`/user/campaigns/${campaign.id}/edit/basic`)
    })
  }

  // TODO: maybe return loader
}
