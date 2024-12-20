import { CampaignOverview } from '@/components/CampaignOverview'
import { MediaGallery } from '@/components/MediaGallery'
import { MOCK_CAMPAIGN } from '@/constants/campaigns-mock'

const CampaignPage = async () => {
  return (
    <div className="px-[16px] py-[80px] sm:px-[60px] md:px-[60px]">
      <h1 className="mb-5 text-[60px]">Campaign Title</h1>
      <p className="mb-[30px] text-[32px]">Campaign short description</p>

      <div className="flex flex-row gap-[100px] max-xl:gap-[50px] max-lg:flex-col-reverse max-lg:justify-end lg:h-[1000px]">
        <div>
          <MediaGallery mediaItems={MOCK_CAMPAIGN.media} />

          <p className="mt-[90px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est delectus veritatis esse. Libero facere
            odit nesciunt doloribus saepe quos temporibus dolorem, laborum veritatis quod in consectetur nam quidem
            blanditiis!Loremlorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias facilis itaque ad,
            animi laborum rem perferendis repudiandae sunt reiciendis culpa eius quaerat, id repellendus assumenda
            consequuntur rerum delectus qui suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            quia nam atque voluptas illo eaque, dolore officia dicta molestias tenetur labore natus. Unde enim eligendi
            repudiandae vitae nisi, accusamus et!
          </p>
        </div>

        <div>
          <CampaignOverview campaign={MOCK_CAMPAIGN} className="sticky max-lg:block" />
        </div>
      </div>
    </div>
  )
}

export default CampaignPage
