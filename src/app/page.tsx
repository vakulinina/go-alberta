import { getCampaigns } from '@/api/campaignApi'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { Carousel } from '@/components/Carousel/Carousel'

export default async function Home() {
  const campaigns = await getCampaigns({ campaignStatusId: 3 })

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
