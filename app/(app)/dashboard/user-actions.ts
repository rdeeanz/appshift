'use server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers as nextHeaders } from 'next/headers'

async function getAuthUser() {
  const payload = await getPayload({ config: configPromise })
  const headers = await nextHeaders()
  const { user } = await payload.auth({ headers })
  return user
}

const USER_ROLES = ['admin', 'editor', 'user'] as const
type UserRole = (typeof USER_ROLES)[number]

function getRole(value: FormDataEntryValue | null): UserRole {
  return USER_ROLES.includes(value as UserRole) ? value as UserRole : 'user'
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function createUserAction(formData: FormData) {
  const user = await getAuthUser()
  if (!user || user.role !== 'admin') throw new Error('Unauthorized')

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const role = getRole(formData.get('role'))
  const password = formData.get('password') as string

  if (!isValidEmail(email)) {
    return { error: 'Invalid email address.' }
  }

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.create({
      collection: 'users',
      data: {
        username,
        email,
        role,
        password,
      },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to create user' }
  }
}

export async function updateUserAction(id: string, formData: FormData) {
  const user = await getAuthUser()
  if (!user || user.role !== 'admin') throw new Error('Unauthorized')

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const role = getRole(formData.get('role'))

  if (!isValidEmail(email)) {
    return { error: 'Invalid email address.' }
  }

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.update({
      collection: 'users',
      id,
      data: {
        username,
        email,
        role,
      },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to update user' }
  }
}

export async function deleteUserAction(id: string) {
  const user = await getAuthUser()
  if (!user || user.role !== 'admin') throw new Error('Unauthorized')

  if (user.id === Number(id)) {
    return { error: 'You cannot delete your own account.' }
  }

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.delete({
      collection: 'users',
      id,
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to delete user' }
  }
}

export async function resetPasswordAction(email: string) {
  const user = await getAuthUser()
  if (!user || user.role !== 'admin') throw new Error('Unauthorized')

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to send reset link' }
  }
}
