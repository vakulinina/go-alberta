'use client'

import { useState } from 'react'
import { Input } from '@/components/Inputs/Input'
import { Button } from '@/components/Button'
import { userApi } from '@/api/userApi'

interface ConfirmationPanelProps {
  email: string
  onConfirmSuccess: () => void
}

export function ConfirmationPanel({ email, onConfirmSuccess }: ConfirmationPanelProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setIsLoading(true)
      await userApi.confirmEmail({ code, email })
      onConfirmSuccess()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Invalid code. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleConfirm} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <Button type="submit" fullWidth loading={isLoading}>
        Confirm
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </form>
  )
}
