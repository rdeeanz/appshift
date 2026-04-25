import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-[260px]">
            <Link href="/" className="flex items-center gap-2 text-[1rem] font-bold text-txt mb-2.5">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="7" fill="#c96442"/>
                <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.2 16h7.6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              AppShift
            </Link>
            <p className="text-[0.875rem] text-muted leading-[1.6]">
              Discover, compare, and share software alternatives. Powered by a global community of developers.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-10">
            <div>
              <h4 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4">Platform</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="/browse" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Browse Apps</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">New Submissions</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Featured</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Submit Tool</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Developer API</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Community</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-[0.875rem] text-muted hover:text-accent transition-colors">Cookie Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[0.75rem] text-faint">
            © {new Date().getFullYear()} AppShift Platform. All rights reserved. Built with Next.js and Payload.
          </p>
          <div className="flex items-center gap-5">
            {['Twitter', 'GitHub', 'Discord'].map(social => (
              <Link key={social} href="#" className="text-[0.75rem] text-faint hover:text-accent transition-colors">{social}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
