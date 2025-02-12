'use client'

import Link from 'next/link'
import { NavLinks } from './NavLinks'
import { useCallback, useEffect, useState } from 'react'
import { XmarkIcon } from './Icons/XmarkIcon'
import { BarsIcon } from './Icons/BarsIcon'
import { UserAvatar } from './UserAvatar'
import { LoginPanel } from './LoginBoard/LoginPanel'
import { SignUpPanel } from './LoginBoard/SignUpPanel'
import { ConfirmationPanel } from './LoginBoard/ConfirmationPanel'
import logo from '../images/logo.png'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

const MenuButtons = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <>
    {/* <Link className="whitespace-nowrap" href="/user/campaigns/new">
      Start a Campaign
    </Link> */}
    <button onClick={onLoginClick} className="whitespace-nowrap">
      Log in / Sign up
    </button>
  </>
)

const MobileMenu = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClose = () => {
    setMenuOpen(false)
    onClose?.()
  }

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
        onClick={handleClose}
      >
        <div className="flex flex-col items-start py-4">{children}</div>
      </div>
    </>
  )
}

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [currentStep, setCurrentStep] = useState<'login' | 'signup' | 'confirm'>('login')
  const [emailForConfirmation, setEmailForConfirmation] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
      setUsername(`${user.name} ${user.surname}`.trim())
    }
  }, [user])

  const handleLoginClick = useCallback(() => {
    setShowLoginModal(true)
    setCurrentStep('login')
  }, [])

  const handleLoginSuccess = async () => {
    const userData = localStorage.getItem('userData')
    const user = userData ? JSON.parse(userData) : null

    if (user) {
      try {
        setUsername(`${user.name} ${user.surname}`.trim())
        setIsLoggedIn(true)
      } catch (err) {
        console.error('Failed to fetch user after login:', err)
      }
    }
  }

  const handleSignUpSuccess = (email: string) => {
    setCurrentStep('confirm')
    setEmailForConfirmation(email)
  }

  const handleConfirmationSuccess = () => {
    setCurrentStep('login')
    setEmailForConfirmation('')
  }

  const handleCloseModal = () => {
    setShowLoginModal(false)
    setCurrentStep('login')
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    setUsername('')
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
                <UserAvatar username={username} onLogout={handleLogout} />
              </div>
            ) : (
              <MenuButtons onLoginClick={handleLoginClick} />
            )}
          </div>
        </MobileMenu>

        <div className="ml-auto hidden gap-[50px] text-[20px] md:flex">
          {isLoggedIn ? (
            <UserAvatar username={username} onLogout={handleLogout} />
          ) : (
            <MenuButtons onLoginClick={handleLoginClick} />
          )}
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-[480px] rounded-lg bg-white p-6">
            {currentStep === 'login' && (
              <LoginPanel
                onLoginSuccess={handleLoginSuccess}
                onSwitchToSignUp={() => setCurrentStep('signup')}
                setShowLoginModal={setShowLoginModal}
              />
            )}
            {currentStep === 'signup' && (
              <SignUpPanel
                onSignUpSuccess={handleSignUpSuccess}
                onSwitchToLogin={() => setCurrentStep('login')}
                onClose={handleCloseModal}
              />
            )}
            {currentStep === 'confirm' && (
              <ConfirmationPanel email={emailForConfirmation} onConfirmSuccess={handleConfirmationSuccess} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
