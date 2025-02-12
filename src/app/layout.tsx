import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer/Footer'
import { AuthProvider } from '@/context/AuthContext'

const albertSans = localFont({
  src: './fonts/AlbertSans.ttf',
  variable: '--font-albert-sans',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Go Alberta',
  description: 'Go Alberta',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} flex min-h-screen flex-col overflow-x-hidden antialiased`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
