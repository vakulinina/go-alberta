import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer/Footer'

const benne = localFont({
  src: './fonts/Benne-Regular.ttf',
  variable: '--font-benne',
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
      <body className={`${benne.variable} flex min-h-screen flex-col overflow-x-hidden antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
