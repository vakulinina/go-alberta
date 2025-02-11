import { useState } from 'react'

const variantStyles = {
  error: 'bg-red-400',
  success: 'bg-lime-600',
  info: 'bg-purple-800',
}

export const Toast = ({
  message,
  onClose,
  variant = 'info',
}: {
  message: string
  onClose?: () => void
  variant?: 'error' | 'success' | 'info'
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed right-4 top-4 z-10 flex animate-slide-in items-center gap-2 rounded-lg ${variantStyles[variant]} px-6 py-3 text-white shadow-lg`}
    >
      <span>{message}</span>
      <button onClick={handleClose} className="text-white hover:text-gray-200">
        ✕
      </button>
    </div>
  )
}
