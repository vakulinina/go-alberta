import { getCampaigns } from '@/api/campaignApi'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { Carousel } from '@/components/Carousel/Carousel'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId') || cookieStore.get('guestId')
  const campaigns = await getCampaigns({ campaignStatusId: 3, userId: Number(userId?.value) })

  return (
    <div className="px-[100px] py-[70px]">
      {campaigns.length === 0 ? (
        <p className="text-center">Check back soon - exciting campaigns are on the way!</p>
      ) : (
        <Carousel title="Popular Campaigns" link="/campaigns">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.campaignId} {...campaign} />
          ))}
        </Carousel>
      )}
    </div>
  )
}
