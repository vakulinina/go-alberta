import { getCampaignQna } from '@/api/campaignApi'
import { cookies } from 'next/headers'

const CampaignFaqTab = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId') || cookieStore.get('guestId')

  const qna = await getCampaignQna(id, Number(userId?.value))

  if (!qna?.length) return <p className="text-center">No questions and answers available</p>

  return qna?.map(({ question, answer }) => (
    <div className="mb-[76px] last:mb-0" key={question}>
      <h3 className="mb-[16px] text-[40px]">{question}</h3>

      <p className="text-[20px]">{answer}</p>
    </div>
  ))
}

export default CampaignFaqTab
