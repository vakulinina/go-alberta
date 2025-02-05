interface DropdownProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: { categoryId: number; categoryName: string }[]
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
      className="h-[50px] w-full rounded-lg border border-[##BABABA] capitalize"
    >
      {options.map(({ categoryId, categoryName }) => (
        <option key={categoryId} value={categoryId}>
          {categoryName}
        </option>
      ))}
    </select>
  </div>
)
