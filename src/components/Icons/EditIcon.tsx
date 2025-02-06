import React from 'react'

export const EditIcon = ({ className }: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
      <path d="M4 16V20H8L18 10L14 6L4 16Z" className={className} />
      <path
        d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
        stroke="#582F93"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  )
}
