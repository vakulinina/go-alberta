import { getCampaignById, getCampaignPerks } from '@/api/campaignApi'
import { Carousel } from '@/components/Carousel/Carousel'
import { PerkCard } from '@/components/PerkCard'
import { cookies } from 'next/headers'

const OverviewTab = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId') || cookieStore.get('guestId')

  const campaign = await getCampaignById(id, Number(userId?.value))
  const perks = await getCampaignPerks(id, Number(userId?.value))

  if (!campaign) return null

  const updatedPerks = perks?.map((perk) => ({
    ...perk,
    perkImage: perk.perkImage ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + perk.perkImage : undefined,
  }))

  return (
    <>
      {perks?.length > 0 && (
        <Carousel
          title="Perks"
          gap={20}
          itemWidth={220}
          className="mb-[96px] [&>div:nth-of-type(1)]:mb-[30px] [&>div:nth-of-type(1)]:flex-row-reverse"
        >
          {updatedPerks.map((perk) => (
            <PerkCard key={perk.perkId} {...perk} />
          ))}
        </Carousel>
      )}

      <div className="text-justify">
        {campaign.campaignDesc?.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index} className="mb-4 text-justify">
            {paragraph.split(/\n/).map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex !== paragraph.split(/\n/).length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}
      </div>
    </>
  )
}

export default OverviewTab
