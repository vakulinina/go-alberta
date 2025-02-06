import { useState } from 'react'

export const Toast = ({ message, onClose }: { message: string; onClose?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-4 top-4 z-10 flex animate-slide-in items-center gap-2 rounded-lg bg-red-400 px-6 py-3 text-white shadow-lg">
      <span>{message}</span>
      <button onClick={handleClose} className="text-white hover:text-gray-200">
        ✕
      </button>
    </div>
  )
}
