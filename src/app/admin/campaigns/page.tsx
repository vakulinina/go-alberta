'use client'

import CampaignReview from '@/components/Admin/CampaignReview'
import { useAuth } from '@/context/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()

  if (!user || !user.isAdmin) return <p className="m-8 text-center">You need administrator access to view this page.</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Campaign Review Dashboard</h1>
      <CampaignReview />
    </div>
  )
}
