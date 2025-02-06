interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  isFilled: boolean
}

export const BookmarkIcon = ({ isFilled = false, className }: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {isFilled && (
        <path
          d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V21L12 15L6 21V6Z"
          fill="#582F93"
          id="fill"
          className={className}
        />
      )}
      <path
        id="stroke"
        d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V21L12 15L6 21V6Z"
        stroke="#582F93"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  )
}
