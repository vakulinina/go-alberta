'use client'

import React from 'react'
import { BookmarkIcon } from '../../Icons/BookmarkIcon'

const BookmarkButtonComponent = () => {
  const [isSaved, setIsSaved] = React.useState(false)

  const handleBookmark = () => {
    setIsSaved(!isSaved)
  }

  return (
    <button className="group/bookmark absolute left-0 top-0 p-[10px]" onClick={handleBookmark}>
      <BookmarkIcon isFilled={isSaved} className="group-hover/bookmark:stroke-[#FFFFFF]" />
    </button>
  )
}

export const BookmarkButton = React.memo(BookmarkButtonComponent)
