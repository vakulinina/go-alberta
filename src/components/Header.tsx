/*import Link from 'next/link'
import { NavLinks } from './NavLinks'

export const Header = () => {
  return (
    <header className="box-border flex h-[84px] items-center justify-between border-b border-[#E1E1E1] px-[9px]">
      <Link href="/" className="mr-[56px] whitespace-nowrap text-[32px] uppercase">
        Go Alberta
      </Link>
      <div className="flex gap-[50px]">
        <NavLinks />
      </div>
      <div className="ml-auto flex gap-[50px] text-[20px]">
        <span>Start a Campaign</span>
        <span>Log in / Sign up</span>
      </div>
    </header>
  )
}*/

'use client'
import Link from 'next/link'
import { NavLinks } from './NavLinks'
import { useState } from 'react'
import { LoginBoard } from './loginBoard'

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <>
      <header className="box-border flex h-[84px] items-center justify-between border-b border-[#E1E1E1] px-[9px]">
        <Link href="/" className="mr-[56px] uppercase">
          Go Alberta
        </Link>
        <div className="flex gap-[50px]">
          <NavLinks />
        </div>
        <div className="ml-auto flex gap-[50px]">
          <span>Start a Campaign</span>
          <button onClick={() => setShowLoginModal(true)} className="cursor-pointer hover:underline">
            Log in / Sign up
          </button>
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoginBoard onClose={() => setShowLoginModal(false)} />
        </div>
      )}
    </>
  )
}
