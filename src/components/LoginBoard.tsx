import { useState } from 'react'
import Link from 'next/link'
import { EyeIcon } from './Icons/EyeIcon'
import { EyeOffIcon } from './Icons/EyeOffIcon'
import { XmarkIcon } from './Icons/XmarkIcon'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

interface LoginBoardProps {
  onClose: () => void
  onLogin: () => void
}

export const LoginBoard = ({ onClose, onLogin }: LoginBoardProps) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email && password) {
      onLogin()

      router.push('/user')
    }
  }

  return (
    <div className="relative min-h-[700px] w-full max-w-[480px] rounded-lg bg-white p-12 pt-28">
      <button onClick={onClose} className="absolute left-6 top-6 p-2">
        <XmarkIcon className="h-6 w-6 text-gray-500" />
      </button>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl">Start your journey with us</h1>
        <h2 className="mb-4 text-xl">Login to Go Alberta</h2>
        <p className="text-sm text-gray-600">
          Don`t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-gray-50 p-3"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-gray-50 p-3"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        <Button fullWidth type="submit">
          Log in
        </Button>

        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forget password?
          </Link>
        </div>
      </form>
    </div>
  )
}
