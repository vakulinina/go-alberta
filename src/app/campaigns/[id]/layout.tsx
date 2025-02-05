import { getCampaignById, getCampaignMedia } from '@/api/campaignApi'
import { CampaignOverview } from '@/components/CampaignOverview'
import { MediaGallery } from '@/components/MediaGallery'
import { TabBox } from '@/components/TabBox'
import { Metadata } from 'next'

type CampaignLayoutProps = {
  children: React.ReactNode
  params: Promise<{ id: number }>
}

export async function generateMetadata({ params }: CampaignLayoutProps): Promise<Metadata> {
  const id = (await params).id

  const campaign = await getCampaignById(id)

  return {
    title: `${campaign?.title || 'Campaign'} | Go Alberta`,
  }
}

const CampaignLayout = async ({ children, params }: CampaignLayoutProps) => {
  const id = (await params).id

  const campaign = await getCampaignById(id)
  const media = await getCampaignMedia(id)

  const tabs = [
    { name: 'Overview', href: `/campaigns/${id}/overview` },
    { name: 'Q&A', href: `/campaigns/${id}/faq` },
    { name: 'Discussions', href: `/campaigns/${id}/discussions` },
  ]

  return (
    <div className="px-[16px] py-[80px] sm:px-[60px] md:px-[60px]">
      <h1 className="mb-5 text-[60px]">{campaign?.title}</h1>

      <div className="flex flex-row gap-[100px] max-xl:gap-[50px] max-lg:flex-col-reverse max-lg:justify-end">
        <div className="w-full overflow-hidden">
          {/* TODO: generate embed url from video url */}
          {media?.length && <MediaGallery mediaItems={media} className="mb-[90px]" />}

          <TabBox tabs={tabs} />
          <div className="pt-[80px]">{children}</div>
        </div>

        <div>{campaign && <CampaignOverview campaign={campaign} className="sticky max-lg:block" />}</div>
      </div>
    </div>
  )
}

export default CampaignLayout
