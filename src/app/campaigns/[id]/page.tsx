import { redirect } from 'next/navigation'

export default async function CampaignPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  redirect(`/campaigns/${id}/overview`)
}
