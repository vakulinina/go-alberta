import React from 'react'

export const TextInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className={`rounded-lg border border-[##BABABA] px-[16px] py-[14px] text-[14px] placeholder:text-[#8F8F8F] ${className}`}
      {...props}
    />
  )
}
