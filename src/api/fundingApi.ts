if (!process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL) {
  throw new Error('API URL is not defined')
}

const BASE_URL = process.env.NEXT_PUBLIC_CAMPAIGNS_API_URL

const userData = global?.window?.localStorage.getItem('userData')
const userId = userData ? JSON.parse(userData).userId : 1

type Funding = {
  campaignId: number
  amount: number
}

export const createFunding = async (funding: Funding) => {
  const { campaignId, amount } = funding

  const params = {
    amount,
    userId,
  }

  const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/funding`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create funding')
  }

  return response.json()
}
