interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = ({ className, type = 'text', error, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={`${error ? 'border-red-500' : 'border-[#BABABA]'} relative w-full rounded-lg border px-[16px] py-[14px] text-[14px] placeholder:text-[#8F8F8F] focus:outline-[#582F93] ${className}`}
      {...props}
    />
  )
}
