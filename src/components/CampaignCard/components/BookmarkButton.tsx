'use client'

import React from 'react'
import { BookmarkIcon } from '../../Icons/BookmarkIcon'

const BookmarkButtonComponent = () => {
  const [isSaved, setIsSaved] = React.useState(false)

  const handleBookmark: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setIsSaved(!isSaved)
  }

  return (
    <button className="group/bookmark absolute left-0 top-0 p-[10px]" onClick={handleBookmark} type="button">
      <BookmarkIcon isFilled={isSaved} className="group-hover/bookmark:stroke-[#51236DD9]" />
    </button>
  )
}

export const BookmarkButton = React.memo(BookmarkButtonComponent)
