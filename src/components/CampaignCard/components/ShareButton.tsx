'use client'

import React from 'react'
import { ShareIcon } from '@/components/Icons/ShareIcon'

const ShareButtonComponent = ({ onClick }: React.HTMLAttributes<HTMLButtonElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClick?.(e)
  }

  return (
    <button className="group/share absolute right-0 top-0 p-[10px]" onClick={handleClick}>
      <ShareIcon className="stroke-[#582F93] group-hover/share:stroke-[#51236DD9] group-active/share:fill-[#51236DD9]" />
    </button>
  )
}

export const ShareButton = React.memo(ShareButtonComponent)
