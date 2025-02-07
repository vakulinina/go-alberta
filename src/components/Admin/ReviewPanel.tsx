'use client'
import React, { useState, useEffect } from 'react'
import { CampaignReviewType } from '@/types/admin'

interface ReviewPanelProps {
  isOpen: boolean
  review: CampaignReviewType | null
  onClose: () => void
  onSubmit: (review: CampaignReviewType, comment: string) => void
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ isOpen, review, onClose, onSubmit }) => {
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (!isOpen) {
      setComment('')
    }
  }, [isOpen])

  if (!isOpen || !review) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Review Campaign</h2>
        <p className="mb-4">Campaign: {review.title}</p>

        <textarea
          className="w-full rounded border p-2"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please leave a comment"
        />

        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-700"
            onClick={() => {
              onSubmit(review, comment)
              setComment('')
              onClose()
            }}
          >
            OK
          </button>
          <button className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewPanel
