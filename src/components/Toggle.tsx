interface ToggleProps {
  values: { key: string; title: string }[]
  onSelect: (key: string) => void
  className?: string
  activeValue: string
}

export const Toggle = ({ values, onSelect, className, activeValue }: ToggleProps) => (
  <div className={`flex ${className}`}>
    {values.map(({ key, title }) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        type="button"
        className={`flex h-[40px] w-[136px] items-center justify-center border bg-[#E1E1E1] text-[20px] text-[#8F8F8F] ${
          key === activeValue && 'border-[3px] border-[#88BE3C] bg-[#FFFFFF] !text-[#000000]'
        }`}
      >
        {title}
      </button>
    ))}
  </div>
)
