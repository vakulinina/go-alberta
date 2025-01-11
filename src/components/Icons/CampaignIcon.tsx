import React from 'react'

export const CampaignIcon = ({ className }: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" className={`shrink-0 ${className}`}>
      <g clipPath="url(#clip0_559_853)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2C0 1.17157 0.671573 0.5 1.5 0.5H12.5C13.3284 0.5 14 1.17157 14 2V3.375H0V2ZM0 4.625H14V10C14 10.8284 13.3284 11.5 12.5 11.5H10.3107L12.0303 13.2197C12.3232 13.5126 12.3232 13.9874 12.0303 14.2803C11.7374 14.5732 11.2626 14.5732 10.9697 14.2803L8.18934 11.5H7.75V13.75C7.75 14.1642 7.41421 14.5 7 14.5C6.58579 14.5 6.25 14.1642 6.25 13.75V11.5H5.81066L3.03033 14.2803C2.73744 14.5732 2.26256 14.5732 1.96967 14.2803C1.67678 13.9874 1.67678 13.5126 1.96967 13.2197L3.68934 11.5H1.5C0.671573 11.5 0 10.8284 0 10V4.625Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_559_853">
          <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}
