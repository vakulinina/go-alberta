'use client'

import React, { useState } from 'react'
import { BookmarkIcon } from '../../Icons/BookmarkIcon'
import { addCampaignToSaved, removeCampaignFromSaved } from '@/api/userApi'
import { useAuth } from '@/context/AuthContext'

interface BookmarkButtonProps {
  campaignId: number
  isBookmarked: boolean
  onToggle: (newState: boolean) => void
  onRemoveFromSavedList?: (campaignId: number) => void
}

const BookmarkButtonComponent = ({
  campaignId,
  isBookmarked,
  onToggle,
  onRemoveFromSavedList,
}: BookmarkButtonProps) => {
  const { user } = useAuth()
  const userId = user?.userId
  const [loading, setLoading] = useState(false)

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!userId) {
      alert('Please log in to save campaigns.')
      return
    }

    setLoading(true)
    try {
      if (isBookmarked) {
        await removeCampaignFromSaved(userId, campaignId)
        onToggle(false)
        onRemoveFromSavedList?.(campaignId)
      } else {
        await addCampaignToSaved(userId, campaignId)
        onToggle(true)
      }
    } catch (error) {
      console.error('Error updating bookmark status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className="group/bookmark absolute left-0 top-0 p-[10px]"
      onClick={handleBookmark}
      type="button"
      disabled={loading}
    >
      <BookmarkIcon isFilled={isBookmarked} className="group-hover/bookmark:stroke-[#51236DD9]" />
    </button>
  )
}

export const BookmarkButton = React.memo(BookmarkButtonComponent)
