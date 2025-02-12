'use client'

import { createCampaign } from '@/api/campaignApi'
import { Spinner } from '@/components/Spinner'
import { useAuth } from '@/context/AuthContext'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewCampaignPage() {
  const { user } = useAuth()
  const [exist, setExist] = useState(false)

  useEffect(() => {
    if (!user) {
      // TODO: redirect to login page
      redirect('/')
      return
    }

    createCampaign(user.userId).then((campaign) => {
      if (campaign.exist === 1) {
        setExist(true)
      } else if (campaign?.campaignId) {
        redirect(`/user/campaigns/${campaign.campaignId}/edit/basic`)
      }
    })
  }, [user])

  if (exist) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">You already have an active campaign.</p>
        <p className="mt-2 text-sm text-gray-600">You can view and manage your campaign in the My Campaigns tab.</p>
      </div>
    )
  }

  return (
    <div className="flex h-[200px] items-center justify-center">
      <Spinner />
    </div>
  )
}
