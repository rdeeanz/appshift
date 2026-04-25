import React from 'react'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata = {
  title: 'AppShift — Discover Newly Submitted Apps',
  description: 'Fresh software discovered by the AppShift community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
