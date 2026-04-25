'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Search, Menu, X, Sun, Moon } from 'lucide-react'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1200px] mx-auto px-5 h-[3.75rem] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[1.0625rem] font-bold text-txt">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="7" fill="#c96442"/>
            <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.2 16h7.6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          AppShift
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/browse" className="text-muted text-[0.875rem] hover:text-txt transition-colors">Browse</Link>
          <Link href="/" className="text-muted text-[0.875rem] hover:text-txt transition-colors font-semibold text-txt">New Apps</Link>
          <Link href="/categories" className="text-muted text-[0.875rem] hover:text-txt transition-colors">Categories</Link>
          <Link href="/blog" className="text-muted text-[0.875rem] hover:text-txt transition-colors">Blog</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:border-accent hover:bg-accentLight transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
          </button>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search apps…" 
              className="bg-surface border border-border rounded-md px-3 py-2 pl-9 text-[0.875rem] w-40 focus:border-accent focus:ring-3 focus:ring-accent/10 outline-none transition-all" 
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
          </div>
          
          <Link href="/sign-in" className="text-[0.875rem] text-muted hover:text-txt transition-colors">Sign In</Link>
          <Link href="#" className="btn-primary">Submit App</Link>
        </div>

        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-txt">
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenu && (
        <div className="md:hidden border-t border-border p-4 flex flex-col gap-3.5 bg-bg">
          <Link href="/browse" className="text-muted text-[0.875rem]" onClick={() => setMobileMenu(false)}>Browse</Link>
          <Link href="/" className="text-muted text-[0.875rem]" onClick={() => setMobileMenu(false)}>New Apps</Link>
          <Link href="/categories" className="text-muted text-[0.875rem]" onClick={() => setMobileMenu(false)}>Categories</Link>
          <Link href="/blog" className="text-muted text-[0.875rem]" onClick={() => setMobileMenu(false)}>Blog</Link>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-between p-2 rounded-md border border-border bg-surface"
          >
            <span className="flex items-center gap-2 text-[0.875rem] text-muted">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <div className={`w-11 h-6 rounded-full border border-border relative transition-colors ${theme === 'dark' ? 'bg-accent border-accent' : 'bg-surface-alt'}`}>
              <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'left-[1.375rem]' : 'left-0.5'}`} />
            </div>
          </button>
          <Link href="/sign-in" className="text-muted text-[0.875rem]" onClick={() => setMobileMenu(false)}>Sign In</Link>
          <Link href="#" className="btn-primary text-center">Submit App</Link>
        </div>
      )}
    </nav>
  )
}
