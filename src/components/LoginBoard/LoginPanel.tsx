'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/Inputs/Input'
import { PasswordInput } from '@/components/Inputs/PasswordInput'
import { Button } from '@/components/Button'
import { userApi } from '@/api/userApi'
import { XmarkIcon } from '@/components/Icons/XmarkIcon'

interface LoginPanelProps {
  onLoginSuccess: () => void
  onSwitchToSignUp: () => void
  setShowLoginModal: (value: boolean) => void
}

export function LoginPanel({ onLoginSuccess, onSwitchToSignUp, setShowLoginModal }: LoginPanelProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setIsLoading(true)

      const response = await userApi.login(email, password)
      console.log(response)

      if ('userId' in response) {
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: response.userId,
            name: response.user.name,
            surname: response.user.surname,
            status: response.user.status,
          })
        )
        onLoginSuccess()
        setShowLoginModal(false)
        router.push('/user')
      } else {
        setError(response.message || 'Unexpected response.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="p-15 relative mx-auto flex min-h-[700px] w-full max-w-md flex-col items-center justify-between rounded-lg bg-white"
    >
      <button
        type="button"
        className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
        onClick={() => setShowLoginModal(false)}
      >
        <XmarkIcon className="h-6 w-6" />
      </button>

      <div className="mt-20 flex w-[400px] flex-col items-center justify-center space-y-6">
        <div className="mb-4 flex flex-col items-center justify-center space-y-2">
          {' '}
          <h2 className="text-2xl font-bold leading-snug text-black">Continue your journey with us</h2>
          <p className="text-base text-black">Login to Go Alberta</p>
          <button type="button" onClick={onSwitchToSignUp} className="text-sm text-gray-600 hover:underline">
            Don&apos;t have an account? Sign up
          </button>
        </div>

        <div className="w-full space-y-3">
          {' '}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
          Log in
        </Button>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="mt-4 cursor-pointer text-center text-sm text-gray-500 hover:underline">Forgot password?</div>
      </div>
    </form>
  )
}
