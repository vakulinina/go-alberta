interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const TextArea = ({ className, error, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-[#BABABA]'} p-[16px] text-[14px] placeholder:text-[#8F8F8F] ${className}`}
      rows={5}
      {...props}
    />
  )
}
