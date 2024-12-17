import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { Carousel } from '@/components/Carousel/Carousel'
import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'

export default function Home() {
  return (
    <div className="px-[100px] py-[70px]">
      <Carousel title="Popular Campaigns" link="/campaigns">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </Carousel>
    </div>
  )
}
