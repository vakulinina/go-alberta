'use client'

import { getCampaigns, getCampaignCategories } from '@/api/campaignApi'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import React, { useCallback, useEffect, useState } from 'react'
import { CategoryFilter } from '../../components/CategoryFilter'
import { useAuth } from '@/context/AuthContext'
import { Campaign } from '@/types/campaign'
import { Category } from '@/api/types'

const CampaignsPage = () => {
  const { user, guestId } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      getCampaigns({ campaignStatusId: 3, userId: user?.userId || guestId }).then((campaigns) => {
        setCampaigns(campaigns)
      })

      getCampaignCategories().then((categories) => {
        setCategories(categories)
      })
    }

    fetchCampaigns()
  }, [guestId, user?.userId])

  const handleCategoryChange = useCallback(
    async (categoryIds: number[]) => {
      const campaigns = await getCampaigns({
        campaignStatusId: 3,
        userId: user?.userId || guestId,
        categoryIds: categoryIds.join(','),
      })

      setCampaigns(campaigns)
    },
    [user?.userId, guestId]
  )

  return (
    <div className="flex gap-8 px-[30px] py-[60px] lg:px-[56px]">
      <div className="w-[200px] flex-shrink-0 lg:w-[250px]">
        {categories.length > 0 && <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />}
      </div>
      <div className="flex-grow">
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
    </div>
  )
}

export default CampaignsPage
