export const TextArea = ({ className, ...props }: React.InputHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`w-full rounded-lg border border-[##BABABA] p-[16px] text-[14px] placeholder:text-[#8F8F8F] ${className}`}
      rows={5}
      {...props}
    />
  )
}
