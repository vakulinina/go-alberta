import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LoginBoardProps {
  onClose: () => void
}

export const LoginBoard = ({ onClose }: LoginBoardProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w-full max-w-[480px] rounded-lg bg-white p-8">
      <button onClick={onClose} className="float-right p-2">
        <span className="text-2xl">&times;</span>
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

      <div className="mb-8 space-y-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border p-3">
          {/*   <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          */}
          Continue with Google
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border p-3">
          {/*}      <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
          />
          */}
          Continue with Facebook
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border p-3">
          {/*      <Image
            src="/icons/apple.svg"
            alt="Apple"
            width={20}
            height={20}
          />
          */}
          Continue with Apple
        </button>
      </div>
      <div className="mb-8 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-gray-200"></div>
        <span className="text-gray-500">Or</span>
        <div className="h-[1px] flex-1 bg-gray-200"></div>
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
            <Image
              src={showPassword ? '/eye-off.svg' : '/eye.svg'}
              alt={showPassword ? 'Hide password' : 'Show password'}
              width={20}
              height={20}
            />
          </button>
        </div>

        <button type="submit" className="w-full rounded-lg bg-black p-3 text-white transition-colors hover:bg-gray-800">
          Log in
        </button>

        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forget password?
          </Link>
        </div>
      </form>
    </div>
  )
}
