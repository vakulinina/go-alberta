import { FAQ } from '@/types/support'

const BASE_URL = process.env.NEXT_PUBLIC_USERS_API_URL

if (!BASE_URL) {
  throw new Error('API URL is not defined')
}

export const getFAQs = async (): Promise<FAQ[]> => {
  const response = await fetch(`${BASE_URL}/faq`)

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.statusText}`)
  }

  const data: FAQ[] = await response.json()
  return data
}
