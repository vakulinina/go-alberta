'use client'

import { useState, FC } from 'react'
import Image from 'next/image'
import { UserIcon } from './Icons/UserIcon'
import { useRouter } from 'next/navigation'

interface UserAvatarProps {
  username: string
  avatarUrl?: string
  onLogout: () => void
}

export const UserAvatar: FC<UserAvatarProps> = ({ username, avatarUrl, onLogout }) => {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="relative w-full">
      <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 hover:opacity-80">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          {avatarUrl && !imageError ? (
            <Image
              src={avatarUrl}
              alt={username}
              width={40}
              height={40}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <UserIcon className="h-10 w-10 text-gray-600" />
          )}
        </div>
        <span className="text-[20px]">{username}</span>
      </button>
      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-2 w-28 rounded-lg border border-gray-200 bg-white shadow-lg md:left-auto md:right-16">
          <button
            onClick={() => {
              onLogout()
              setShowDropdown(false)
              router.push('/')
            }}
            className="flex w-full items-center justify-center px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
