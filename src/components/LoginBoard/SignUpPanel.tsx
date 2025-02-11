'use client'

import { useState } from 'react'
import { Input } from '@/components/Inputs/Input'
import { PasswordInput } from '@/components/Inputs/PasswordInput'
import { Button } from '@/components/Button'
import { userApi } from '@/api/userApi'

interface SignUpPanelProps {
  onSignUpSuccess: (email: string) => void
  onSwitchToLogin: () => void
  onClose: () => void
}

export function SignUpPanel({ onSignUpSuccess, onSwitchToLogin, onClose }: SignUpPanelProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      await userApi.register({ email, password, firstName, lastName })
      onSignUpSuccess(email)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Registration failed. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="p-15 relative mx-auto flex min-h-[700px] w-full max-w-md flex-col items-center justify-between rounded-lg bg-white"
    >
      <button type="button" className="absolute left-4 top-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-20 flex w-[400px] flex-col items-center justify-center space-y-6">
        <div className="flex h-1/3 flex-col items-center justify-center text-center">
          {' '}
          <h2 className="text-2xl font-bold text-black">Start your journey with us</h2>
          <p className="mt-2 text-base text-black">Sign up to Go Alberta</p>
          <button type="button" onClick={onSwitchToLogin} className="mt-4 text-sm text-gray-600 hover:underline">
            Already have an account? Log in
          </button>
        </div>

        <div className="w-full space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>

        <Button type="submit" fullWidth loading={isLoading}>
          Sign up
        </Button>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}
    </form>
  )
}
