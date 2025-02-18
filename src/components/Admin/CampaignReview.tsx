'use client'
import React, { useState, useEffect } from 'react'
import ApproveConfirm from '@/components/Admin/ApproveConfirm'
import ReviewPanel from '@/components/Admin/ReviewPanel'
import { adminApi } from '@/api/adminApi'
import { CampaignReviewType } from '@/types/admin'
import { Button } from '@/components/Button'
import { useAuth } from '@/context/AuthContext'

const CampaignReview = () => {
  const [reviews, setReviews] = useState<CampaignReviewType[]>([])
  const [isApproveConfirmOpen, setApproveConfirmOpen] = useState(false)
  const [isReviewPanelOpen, setReviewPanelOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState<CampaignReviewType | null>(null)
  const { user } = useAuth()

  const fetchReviews = async () => {
    try {
      const data = await adminApi.getCampaignReviews()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleApproveClick = (review: CampaignReviewType) => {
    setCurrentReview(review)
    setApproveConfirmOpen(true)
  }

  const handleApproveConfirm = async () => {
    if (!currentReview || !user) return

    try {
      await adminApi.updateCampaignStatus(currentReview.campaignId, user.userId, 3)
      setReviews((prevReviews) => prevReviews.filter((review) => review.campaignId !== currentReview.campaignId))
    } catch (error) {
      console.error('Failed to approve campaign:', error)
    } finally {
      setApproveConfirmOpen(false)
      setCurrentReview(null)
    }
  }

  const handleStatusClick = (review: CampaignReviewType) => {
    setCurrentReview(review)
    setReviewPanelOpen(true)
  }

  const handleReject = async (review: CampaignReviewType, comment: string) => {
    if (!user) return

    try {
      await adminApi.updateCampaignStatus(review.campaignId, user.userId, 1, comment)
      setReviews((prevReviews) => prevReviews.filter((r) => r.campaignId !== review.campaignId))
    } catch (error) {
      console.error('Failed to update campaign status:', error)
    } finally {
      setReviewPanelOpen(false)
      setCurrentReview(null)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              User Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Admin Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Review</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {reviews.map((review) => {
            const date = review.startDate
              ? ((d) => new Date(d.getTime() + d.getTimezoneOffset() * 60000).toLocaleDateString())(
                  new Date(review.startDate)
                )
              : '-'

            return (
              <tr key={review.campaignId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <a
                    href={`/campaigns/${review.campaignId}`}
                    className="text-[#582F93] underline hover:text-[#51236D]"
                    target="_blank"
                  >
                    {review.title || 'No Title'}
                  </a>
                </td>
                <td className="px-6 py-4">{`${review.ownerName} ${review.ownerSurname}`}</td>
                <td className="px-6 py-4">{date}</td>
                <td className="px-6 py-4">
                  <span
                    onClick={() => handleStatusClick(review)}
                    className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                  >
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">{review.adminMessage || '-'}</td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleApproveClick(review)} className="h-4 rounded text-sm text-white">
                    Approve
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <ApproveConfirm
        isOpen={isApproveConfirmOpen}
        onClose={() => {
          setApproveConfirmOpen(false)
          setCurrentReview(null)
        }}
        onConfirm={handleApproveConfirm}
      />

      <ReviewPanel
        isOpen={isReviewPanelOpen}
        review={currentReview}
        onClose={() => {
          setReviewPanelOpen(false)
          setCurrentReview(null)
        }}
        onSubmit={handleReject}
      />
    </div>
  )
}

export default CampaignReview
