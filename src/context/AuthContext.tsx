'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { userApi } from '@/api/userApi'
import { User } from '@/types/user'
import Cookies from 'js-cookie'
import { GUEST_ID_KEY, USER_ID_KEY } from './constants'

interface AuthContextType {
  user: User | null
  guestId: number
  loading: boolean
  logIn: (email: string, password: string) => Promise<void>
  signUp: (registerData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>
  confirmEmail: (code: string, email: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [guestId, setGuestId] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const userId = Cookies.get(USER_ID_KEY)

      if (userId) {
        try {
          const userData = await userApi.getUserById(Number(userId))
          setUser(userData)
        } catch (error) {
          console.error('Failed to load user:', error)
          Cookies.remove(USER_ID_KEY)
        }
      }

      const currentGuestId = Cookies.get(GUEST_ID_KEY)
      if (currentGuestId) {
        setGuestId(Number(currentGuestId))
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await userApi.login(email, password)
      if ('userId' in response) {
        const userData = await userApi.getUserById(response.userId)
        setUser(userData)
        Cookies.set('userId', userData.userId.toString())
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      throw error
    }
  }, [])

  const signUp = useCallback(
    async (registerData: { email: string; password: string; firstName: string; lastName: string }) => {
      try {
        await userApi.register(registerData)
      } catch (error) {
        throw error
      }
    },
    []
  )

  const confirmEmail = useCallback(async (code: string, email: string) => {
    try {
      await userApi.confirmEmail({ code, email })
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    console.log('logout')
    Cookies.remove(USER_ID_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      guestId,
      loading,
      logIn,
      signUp,
      confirmEmail,
      logout,
    }),
    [user, guestId, loading, logIn, signUp, confirmEmail, logout]
  )

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
