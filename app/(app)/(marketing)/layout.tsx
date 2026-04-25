import React from 'react'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
