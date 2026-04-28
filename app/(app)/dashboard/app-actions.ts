'use server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers as nextHeaders } from 'next/headers'
import { Buffer } from 'node:buffer'

async function getAuthUser() {
  const payload = await getPayload({ config: configPromise })
  const headers = await nextHeaders()
  const { user } = await payload.auth({ headers })
  return user
}

export async function createAppAction(formData: FormData) {
  try {
    const user = await getAuthUser()
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

    const name = formData.get('name') as string
    const link = formData.get('link') as string
    const description = formData.get('description') as string
    const license = formData.get('license') as string
    const type = formData.get('type') as string
    const platforms = formData.get('platforms') as string
    const features = formData.get('features') as string
    const origin = formData.get('origin') as string
    const categoryId = formData.get('category') as string
    const isFeatured = formData.get('isFeatured') === 'true'
    const heroImage = formData.get('heroImage') as File | null

    const payload = await getPayload({ config: configPromise })

    let heroImageId: number | undefined

    if (heroImage && typeof heroImage.size === 'number' && heroImage.size > 0) {
      try {
        const arrayBuffer = await heroImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const media = await payload.create({
          collection: 'media',
          data: { alt: name },
          file: {
            data: buffer,
            name: heroImage.name || 'upload.jpg',
            size: heroImage.size,
            mimetype: heroImage.type || 'image/jpeg',
          },
        })
        heroImageId = media.id
      } catch (uploadErr: any) {
        console.error('[createAppAction] media upload failed:', uploadErr.message || uploadErr)
        return { error: `Media upload failed: ${uploadErr.message || 'unknown error'}` }
      }
    }

    const data: any = {
      name,
      link,
      description,
      license,
      type,
      platforms,
      features,
      origin,
      isFeatured,
    }
    if (categoryId) data.category = Number(categoryId)
    if (heroImageId) data.heroImage = heroImageId

    const created = await payload.create({ collection: 'apps', data })

    revalidatePath('/browse')
    revalidatePath('/')
    revalidatePath('/dashboard')
    revalidatePath(`/apps/${created.id}`)
    return { success: true }
  } catch (error: any) {
    console.error('[createAppAction] error:', error.message || error)
    return { error: error.message || 'Failed to create app' }
  }
}

export async function updateAppAction(id: string, formData: FormData) {
  try {
    const user = await getAuthUser()
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

    const name = formData.get('name') as string
    const link = formData.get('link') as string
    const description = formData.get('description') as string
    const license = formData.get('license') as string
    const type = formData.get('type') as string
    const platforms = formData.get('platforms') as string
    const features = formData.get('features') as string
    const origin = formData.get('origin') as string
    const categoryId = formData.get('category') as string
    const isFeatured = formData.get('isFeatured') === 'true'
    const heroImage = formData.get('heroImage') as File | null

    const payload = await getPayload({ config: configPromise })

    let heroImageId: number | undefined

    if (heroImage && typeof heroImage.size === 'number' && heroImage.size > 0) {
      try {
        const arrayBuffer = await heroImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const media = await payload.create({
          collection: 'media',
          data: { alt: name },
          file: {
            data: buffer,
            name: heroImage.name || 'upload.jpg',
            size: heroImage.size,
            mimetype: heroImage.type || 'image/jpeg',
          },
        })
        heroImageId = media.id
      } catch (uploadErr: any) {
        console.error('[updateAppAction] media upload failed:', uploadErr.message || uploadErr)
        return { error: `Media upload failed: ${uploadErr.message || 'unknown error'}` }
      }
    }

    const data: any = {
      name,
      link,
      description,
      license,
      type,
      platforms,
      features,
      origin,
      isFeatured,
    }
    if (categoryId) data.category = Number(categoryId)
    if (heroImageId) data.heroImage = heroImageId

    await payload.update({ collection: 'apps', id, data })

    revalidatePath('/browse')
    revalidatePath('/')
    revalidatePath('/dashboard')
    revalidatePath(`/apps/${id}`)
    return { success: true }
  } catch (error: any) {
    console.error('[updateAppAction] error:', error.message || error)
    return { error: error.message || 'Failed to update app' }
  }
}

export async function deleteAppAction(id: string) {
  try {
    const user = await getAuthUser()
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

    const payload = await getPayload({ config: configPromise })
    await payload.delete({ collection: 'apps', id })

    revalidatePath('/browse')
    revalidatePath('/')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error('[deleteAppAction] error:', error.message || error)
    return { error: error.message || 'Failed to delete app' }
  }
}
