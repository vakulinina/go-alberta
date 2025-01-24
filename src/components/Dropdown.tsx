interface DropdownProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: { label: string; id: number }[]
  selectedOption?: number
  name: string
}

export const Dropdown = ({ options, onChange, selectedOption, className, name }: DropdownProps) => (
  <div className={`relative w-full ${className}`}>
    <select
      name={name}
      onChange={onChange}
      defaultValue={selectedOption}
      required
      className="w-full rounded-lg border border-[##BABABA] p-3"
    >
      {options.map(({ label, id }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  </div>
)
