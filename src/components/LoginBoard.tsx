'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { XmarkIcon } from './Icons/XmarkIcon'
import { PasswordInput } from './Inputs/PasswordInput'
import { Button } from './Button'
import { Input } from './Inputs/Input'

// TODO: Separate Login and SignUp components

interface LoginBoardProps {
  onClose: () => void
  onLogin: () => void
}

export function LoginBoard({ onClose, onLogin }: LoginBoardProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const validateForm = () => {
    setError('')

    if (!isLogin) {
      if (!firstName || !lastName) {
        setError('Please enter your full name')
        return false
      }
    }
    if (!email) {
      setError('Please enter your email')
      return false
    }
    if (!password) {
      setError('Please enter your password')
      return false
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (validateForm()) {
        setIsLoading(true)
        // TODO:AUTH API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        onLogin()
        router.push('/user')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (validateForm()) {
        setIsLoading(true)
        // TODO:AUTH REGISTER API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLogin(true)
        setPassword('')
        setConfirmPassword('')
        setFirstName('')
        setLastName('')
        setError('Registration successful! Please log in.')
      }
    } catch (error) {
      console.error('Signup failed:', error)
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-[700px] w-full max-w-[480px] rounded-lg bg-white p-12 pt-28">
      <button onClick={onClose} className="absolute left-6 top-6 p-2">
        <XmarkIcon className="h-6 w-6 text-gray-500" />
      </button>

      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">
          {isLogin ? 'Continue your journey with us' : 'Start your journey with us'}
        </h1>
        <h2 className="mb-4 text-xl font-bold">{isLogin ? 'Login to Go Alberta' : 'Sign up to Go Alberta'}</h2>
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="underline"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>

      {error && <div className="mb-4 text-center text-sm text-red-500">{error}</div>}

      <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        {!isLogin && (
          <div>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
        )}

        <Button type="submit" fullWidth loading={isLoading}>
          {isLogin ? 'Log in' : 'Sign up'}
        </Button>

        {isLogin && (
          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
              Forget password?
            </Link>
          </div>
        )}
      </form>
    </div>
  )
}
