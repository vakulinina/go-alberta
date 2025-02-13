import { getCampaigns } from '@/api/campaignApi'
import { CampaignCard } from '@/components/CampaignCard/CampaignCard'
import { Carousel } from '@/components/Carousel/Carousel'
import { cookies } from 'next/headers'

import mainImage from '@/images/main.jpg'

export default async function Home() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId') || cookieStore.get('guestId')
  const campaigns = await getCampaigns({ campaignStatusId: 3, userId: Number(userId?.value) })

  return (
    <>
      <div className="relative mx-auto h-[400px] w-full sm:h-[600px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${mainImage.src})` }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="max-w-[80%] text-[20px] sm:text-[30px] lg:text-[40px]">
            Go Alberta Booster: Your Gateway to Supporting Local <br /> We Promote Alberta Businesses by helping you
            Invest Local, Learn Local, Cheer Local, and Buy Local - Showcasing Everything Alberta
          </p>
        </div>
      </div>

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
    </>
  )
}
