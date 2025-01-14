'use client'
import Link from 'next/link'
import { NavLinks } from './NavLinks'
import { useCallback, useState } from 'react'
import { XmarkIcon } from './Icons/XmarkIcon'
import { BarsIcon } from './Icons/BarsIcon'
import { UserAvatar } from './UserAvatar'
import { LoginBoard } from './LoginBoard'
import logo from '../images/logo.png'
import Image from 'next/image'

const MenuButtons = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <>
    <Link className="whitespace-nowrap" href="/user/campaigns/new">
      Start a Campaign
    </Link>
    <button onClick={onLoginClick} className="whitespace-nowrap">
      Log in / Sign up
    </button>
  </>
)

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center p-2 text-2xl md:hidden"
      >
        {menuOpen ? <XmarkIcon className="h-[24px] w-[24px]" /> : <BarsIcon />}
      </button>

      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} absolute left-0 top-[84px] z-50 w-full border-b border-[#E1E1E1] bg-white px-[24px] py-[16px]`}
      >
        <div className="flex flex-col items-start py-4">{children}</div>
      </div>
    </>
  )
}

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleLoginClick = useCallback(() => {
    setShowLoginModal(true)
  }, [])

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      <header className="box-border flex h-[84px] items-center justify-between gap-[50px] border-b border-[#E1E1E1] px-[20px]">
        <Link href="/" className="whitespace-nowrap text-[32px] uppercase">
          <Image src={logo} alt="" width={141} />
        </Link>

        <div className="hidden gap-[50px] md:flex">
          <NavLinks />
        </div>

        <MobileMenu>
          <NavLinks />
          <div className="mt-4 flex w-full flex-col items-start text-[20px]">
            {isLoggedIn ? (
              <div className="relative w-full">
                <UserAvatar username="User Name" onLogout={handleLogout} />
              </div>
            ) : (
              <MenuButtons onLoginClick={handleLoginClick} />
            )}
          </div>
        </MobileMenu>

        <div className="ml-auto hidden gap-[50px] text-[20px] md:flex">
          {isLoggedIn ? (
            <UserAvatar username="User Name" onLogout={handleLogout} />
          ) : (
            <MenuButtons onLoginClick={handleLoginClick} />
          )}
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoginBoard onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />
        </div>
      )}
    </>
  )
}
