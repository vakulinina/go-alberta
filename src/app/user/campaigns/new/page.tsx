'use client'

import { createCampaign } from '@/api/campaignApi'
import { Spinner } from '@/components/Spinner'

import { redirect } from 'next/navigation'
// import { useState } from 'react'

export default function NewCampaignPage() {
  // const [exist, setExist] = useState(false)

  createCampaign().then((campaign) => {
    // if (campaign.exist === 1) {
    //   setExist(true)
    // } else if (campaign?.campaignId) {
    if (campaign?.campaignId) {
      redirect(`/user/campaigns/${campaign.campaignId}/edit/basic`)
    }
  })

  // if (exist) {
  //   return (
  //     <div className="p-8 text-center">
  //       <p className="text-lg">You already have an active campaign.</p>
  //       <p className="mt-2 text-sm text-gray-600">You can view and manage your campaign in the My Campaigns tab.</p>
  //     </div>
  //   )
  // }

  return (
    <div className="flex h-[200px] items-center justify-center">
      <Spinner />
    </div>
  )
}
