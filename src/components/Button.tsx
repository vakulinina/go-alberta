import React, { memo } from 'react'
import cx from 'classnames'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'submit' | 'reset' | 'button'
  name?: string
  variant?: 'primary' | 'secondary'
}

const ButtonComponent = ({
  className,
  loading,
  children,
  fullWidth,
  disabled,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cx(
        'relative box-border flex h-[50px] items-center justify-center rounded-[10px] border border-solid px-[30px] transition-colors',
        'whitespace-nowrap text-center text-[20px]',
        'disabled:pointer-events-none disabled:cursor-default',
        {
          'border-[#582F93] bg-[#582F93] text-[#FFFFFF] hover:bg-[#51236DD9]': variant === 'primary',
        },
        {
          'border-[#582F93] bg-[#FFFFFF] text-[#582F93]': variant === 'secondary',
        },
        { 'border-[#E1E1E1] bg-[#E1E1E1]': disabled },
        { 'w-full': fullWidth },
        className
      )}
      disabled={disabled || loading}
      type="button"
      {...props}
    >
      <span className={`${loading && 'invisible'}`}>{children}</span>
      {loading && <Spinner className="absolute" />}
    </button>
  )
}

export const Button = memo(ButtonComponent)
