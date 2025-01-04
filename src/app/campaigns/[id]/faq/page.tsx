import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'

const CampaignFaqTab = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id

  // TODO: replace with actual data fetching
  const { qna } = MOCK_CAMPAIGNS.find((campaign) => campaign.id === id) || { qna: [] }

  if (qna?.length === 0) return <p className="text-center">No questions and answers available</p>

  return qna?.map(({ question, answer }) => (
    <div className="mb-[76px] last:mb-0" key={question}>
      <h3 className="mb-[16px] text-[40px]">{question}</h3>

      <p className="text-[20px]">{answer}</p>
    </div>
  ))
}

export default CampaignFaqTab
