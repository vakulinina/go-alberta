'use client'

import { useState, FC } from 'react'
import Image from 'next/image'

interface UserAvatarProps {
  username: string
  avatarUrl?: string
  onLogout: () => void
}

export const UserAvatar: FC<UserAvatarProps> = ({ username, avatarUrl, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 hover:opacity-80">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={username} width={40} height={40} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg text-gray-600">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-[20px]">{username}</span>
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          <button
            onClick={() => {
              onLogout()
              setShowDropdown(false)
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
