import { getCampaignComments } from '@/api/campaignApi'
import { getUserIdFromCookies } from '../layout'
import { CommentForm, CommentList } from '@/components/Campaign/CommentForm'

const DiscussionsTab = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id
  const userId = await getUserIdFromCookies()
  const comments = await getCampaignComments({ userId }, id)

  return (
    <>
      <CommentList initialComments={comments} />
      <CommentForm campaignId={id} />
    </>
  )
}

export default DiscussionsTab
