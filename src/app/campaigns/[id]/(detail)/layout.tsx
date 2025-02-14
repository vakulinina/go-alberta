import { getCampaignById, getCampaignMedia } from '@/api/campaignApi'
import { CampaignOverview } from '@/components/Campaign/CampaignOverview'
import { MediaGallery } from '@/components/MediaGallery'
import { TabBox } from '@/components/TabBox'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

type CampaignLayoutProps = {
  children: React.ReactNode
  params: Promise<{ id: number }>
}

export async function getUserIdFromCookies() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId') || cookieStore.get('guestId')
  return Number(userId?.value)
}

export async function generateMetadata({ params }: CampaignLayoutProps): Promise<Metadata> {
  const id = (await params).id
  const userId = await getUserIdFromCookies()
  const campaign = await getCampaignById(id, userId)

  return {
    title: `${campaign?.title || 'Campaign'} | Go Alberta`,
  }
}

const CampaignLayout = async ({ children, params }: CampaignLayoutProps) => {
  const id = (await params).id
  const userId = await getUserIdFromCookies()

  const campaign = await getCampaignById(id, userId)
  const media = await getCampaignMedia(id, userId)

  const tabs = [
    { name: 'Overview', href: `/campaigns/${id}/overview` },
    { name: 'Q&A', href: `/campaigns/${id}/faq` },
    { name: 'Discussions', href: `/campaigns/${id}/discussions` },
  ]

  return (
    <div className="px-[16px] py-[80px] sm:px-[60px] md:px-[60px]">
      <h1 className="mb-5 text-[40px]">{campaign?.title}</h1>

      <div className="flex flex-row gap-[100px] max-xl:gap-[50px] max-lg:flex-col-reverse max-lg:justify-end">
        <div className="w-full overflow-hidden">
          {media?.length > 0 && <MediaGallery mediaItems={media} className="mb-[90px]" />}

          <TabBox tabs={tabs} />
          <div className="pt-[80px]">{children}</div>
        </div>
        <div>{campaign && <CampaignOverview campaign={campaign} className="sticky max-lg:block" />}</div>
      </div>
    </div>
  )
}

export default CampaignLayout
