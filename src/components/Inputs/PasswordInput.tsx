import { useState } from 'react'
import { EyeIcon } from '../Icons/EyeIcon'
import { EyeOffIcon } from '../Icons/EyeOffIcon'
import { Input } from './Input'

export const PasswordInput = ({
  value,
  onChange,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <Input type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} {...props} />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
      </button>
    </div>
  )
}
