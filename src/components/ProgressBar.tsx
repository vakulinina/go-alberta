import cx from 'classnames'

interface ProgressBar extends React.HTMLAttributes<HTMLDivElement> {
  percentage?: number
}

export const ProgressBar = ({ percentage = 0, className }: ProgressBar) => {
  return (
    <div className={cx(className, 'h-[7px] w-full overflow-hidden rounded-[3px] bg-[#CED3D9]')}>
      <div className="h-full rounded-[3px] bg-[#80CD57]" style={{ width: `${percentage}%` }}></div>
    </div>
  )
}
