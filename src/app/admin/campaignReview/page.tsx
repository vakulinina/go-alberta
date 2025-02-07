'use client'

import CampaignReview from '@/components/Admin/CampaignReview'

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Campaign Review Dashboard</h1>
      <CampaignReview />
    </div>
  )
}
