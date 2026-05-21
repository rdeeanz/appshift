import React from 'react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="bg-bg min-h-[calc(100vh-3.75rem)] flex items-center justify-center py-12 px-5">
      <div className="max-w-[440px] w-full bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="text-center mb-10">
          <h1 className="text-[2.25rem] font-bold text-txt mb-3 font-serif tracking-tight">Create Account</h1>
          <p className="text-muted text-[0.9375rem] leading-relaxed">
            Join the AppShift community to discover and share amazing software.
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider ml-1">
              Username
            </label>
            <input 
              type="text" 
              placeholder="johndoe" 
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider ml-1">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider ml-1">
              Re-type Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full h-12 text-[1rem] mt-2 shadow-lg shadow-accent/20">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-[0.875rem] text-muted">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-bold text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <span className="relative bg-surface px-4 text-[0.75rem] font-bold text-faint uppercase tracking-[0.2em]">
            OR
          </span>
        </div>

        <button className="w-full h-12 rounded-xl border border-border flex items-center justify-center gap-3 text-[0.9375rem] font-bold text-txt hover:bg-bg transition-all">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 5-1 6.6-2.5l-3.2-2.4c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H1.1v2.6C2.8 17.8 6.1 20 10 20z" fill="#34A853"/>
            <path d="M4.4 11.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9V5.5H1.1C.4 6.8 0 8.3 0 10s.4 3.2 1.1 4.5l3.3-2.6z" fill="#FBBC05"/>
            <path d="M10 3.9c1.5 0 2.8.5 3.9 1.5L16.7 2.6C15 1 12.7 0 10 0 6.1 0 2.8 2.2 1.1 5.5l3.3 2.6c.8-2.4 3-4.2 5.6-4.2z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  )
}
