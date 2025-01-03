interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const InputBox = ({ value, onChange, className = '', ...props }: InputProps) => {
  return (
    <div className="max-w-[400px]">
      <input
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ${className}`}
        {...props}
      />
    </div>
  )
}
