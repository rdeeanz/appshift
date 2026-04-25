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

export async function createUserAction(formData: FormData) {
  const user = await getAuthUser()
  if (!user || user.role !== 'admin') throw new Error('Unauthorized')

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const role = formData.get('role') as string
  const password = formData.get('password') as string

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
  const role = formData.get('role') as string

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
