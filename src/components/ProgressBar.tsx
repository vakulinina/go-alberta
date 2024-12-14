export const ProgressBar = ({ percentage = 0 }) => {
  return (
    <div className="h-[7px] w-full overflow-hidden rounded-[3px] bg-[#CED3D9]">
      <div className="h-full rounded-[3px] bg-[#80CD57]" style={{ width: `${percentage}%` }}></div>
    </div>
  )
}
