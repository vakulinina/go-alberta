'use client'

import React from 'react'
import { ShareIcon } from '@/components/Icons/ShareIcon'

const ShareButtonComponent = () => {
  return (
    <button className="group/share absolute right-0 top-0 p-[10px]">
      <ShareIcon className="stroke-[#582F93] group-hover/share:stroke-[#51236DD9]" />
    </button>
  )
}

export const ShareButton = React.memo(ShareButtonComponent)
