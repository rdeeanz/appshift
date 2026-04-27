'use client'
import React, { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginAction } from './actions'
import { AlertCircle, Loader2 } from 'lucide-react'

const initialState = {
  success: false,
  error: null as string | null,
}

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      const dest = state.role === 'admin' || state.role === 'editor' ? '/dashboard' : '/'
      router.push(dest)
      router.refresh()
    }
  }, [state.success, state.role, router])

  return (
    <div className="max-w-[440px] w-full bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="text-center mb-10">
        <h1 className="text-[2.25rem] font-bold text-txt mb-3 font-serif tracking-tight">Welcome</h1>
        <p className="text-muted text-[0.9375rem] leading-relaxed px-4">
          Login to AppShift with either your e-mail or the social provider you used when signing up.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {state.error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-[0.875rem] font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {state.error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider ml-1">
            Email address
          </label>
          <input 
            name="email"
            type="email" 
            placeholder="name@company.com" 
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
            required
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider">
              Password
            </label>
            <Link href="#" className="text-[0.8125rem] font-bold text-accent hover:underline">
              Reset password
            </Link>
          </div>
          <input 
            name="password"
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-[0.9375rem] outline-none focus:border-accent shadow-sm transition-all"
            required
            disabled={isPending}
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="btn-primary w-full h-12 text-[1rem] mt-2 shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : 'Continue'}
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-[0.875rem] text-muted">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-bold text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="relative my-10 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <span className="relative bg-surface px-4 text-[0.75rem] font-bold text-faint uppercase tracking-[0.2em]">
          Or
        </span>
      </div>

      <button 
        type="button"
        disabled={isPending}
        className="w-full h-12 rounded-xl border border-border flex items-center justify-center gap-3 text-[0.9375rem] font-bold text-txt hover:bg-bg transition-all disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 5-1 6.6-2.5l-3.2-2.4c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H1.1v2.6C2.8 17.8 6.1 20 10 20z" fill="#34A853"/>
          <path d="M4.4 11.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9V5.5H1.1C.4 6.8 0 8.3 0 10s.4 3.2 1.1 4.5l3.3-2.6z" fill="#FBBC05"/>
          <path d="M10 3.9c1.5 0 2.8.5 3.9 1.5L16.7 2.6C15 1 12.7 0 10 0 6.1 0 2.8 2.2 1.1 5.5l3.3 2.6c.8-2.4 3-4.2 5.6-4.2z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  )
}
