import { Carousel } from '@/components/Carousel/Carousel'
import { PerkCard } from '@/components/PerkCard'
import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'

const OverviewTab = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  // TODO: replace with actual data fetching
  const { perks, description } = MOCK_CAMPAIGNS.find((product) => product.id === id) || { perks: [] }

  return (
    <>
      {perks?.length > 0 && (
        <Carousel
          title="Perks"
          gap={20}
          itemWidth={220}
          className="mb-[96px] [&>div:nth-of-type(1)]:mb-[30px] [&>div:nth-of-type(1)]:flex-row-reverse"
        >
          {perks.map((perk) => (
            <PerkCard key={perk.title} {...perk} />
          ))}
        </Carousel>
      )}

      <p className="text-justify">{description}</p>
    </>
  )
}

export default OverviewTab
