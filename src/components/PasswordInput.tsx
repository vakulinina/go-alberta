import { useState } from 'react'
import { EyeIcon } from './Icons/EyeIcon'
import { EyeOffIcon } from './Icons/EyeOffIcon'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = ({ value, onChange, className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative max-w-[400px]">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] ${className ?? ''}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  )
}
