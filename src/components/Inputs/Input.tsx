export const Input = ({ className, type = 'text', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type}
      className={`w-full rounded-lg border border-[#BABABA] px-[16px] py-[14px] text-[14px] placeholder:text-[#8F8F8F] ${className}`}
      {...props}
    />
  )
}
