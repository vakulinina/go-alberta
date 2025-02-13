import { cookies } from 'next/headers'
import { AuthProvider } from '@/context/AuthContext'
import { GUEST_ID_KEY } from '@/context/constants'

interface ServerAuthWrapperProps {
  children: React.ReactNode
}

export async function ServerAuthWrapper({ children }: ServerAuthWrapperProps) {
  const cookieStore = await cookies()
  const guestId = cookieStore.get(GUEST_ID_KEY)?.value

  return <AuthProvider initialGuestId={guestId}>{children}</AuthProvider>
}
