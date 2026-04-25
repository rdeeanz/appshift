'use server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { cookies } from 'next/headers'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const payload = await getPayload({ config: configPromise })
  
  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    
    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
      return { success: true, error: null }
    }
  } catch (error: any) {
    return { success: false, error: 'Invalid email or password. Please try again.' }
  }
  
  return { success: false, error: 'An unexpected error occurred.' }
}
