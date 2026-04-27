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

export async function createPostAction(formData: FormData) {
  try {
    const user = await getAuthUser()
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const author = formData.get('author') as string
    const date = formData.get('date') as string
    const category = formData.get('category') as string
    const heroImage = formData.get('heroImage') as File | null
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string

    console.log('[createPostAction] heroImage:', heroImage ? { name: heroImage.name, size: heroImage.size, type: heroImage.type } : null)

    const payload = await getPayload({ config: configPromise })

    let heroImageId: number | undefined

    if (heroImage && typeof heroImage.size === 'number' && heroImage.size > 0) {
      try {
        const arrayBuffer = await heroImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        console.log('[createPostAction] uploading file, buffer length:', buffer.length)

        const media = await payload.create({
          collection: 'media',
          data: {
            alt: title,
          },
          file: {
            data: buffer,
            name: heroImage.name || 'upload.jpg',
            size: heroImage.size,
            mimetype: heroImage.type || 'image/jpeg',
          },
        })
        heroImageId = media.id
        console.log('[createPostAction] media created:', media.id)
      } catch (uploadErr: any) {
        console.error('[createPostAction] media upload failed:', uploadErr.message || uploadErr)
        return { error: `Media upload failed: ${uploadErr.message || 'unknown error'}` }
      }
    }

    await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        author,
        date,
        category,
        heroImage: heroImageId,
        excerpt,
        content,
      },
    })
    revalidatePath('/blog')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error('[createPostAction] uncaught error:', error.message || error)
    return { error: error.message || 'Failed to create post' }
  }
}

export async function updatePostAction(id: string, formData: FormData) {
  try {
    const user = await getAuthUser()
    if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const author = formData.get('author') as string
    const date = formData.get('date') as string
    const category = formData.get('category') as string
    const heroImage = formData.get('heroImage') as File | null
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string

    const payload = await getPayload({ config: configPromise })

    // Fetch existing post to get old slug for cache revalidation
    const existing = await payload.findByID({
      collection: 'posts',
      id,
    })
    const oldSlug = existing?.slug as string | undefined

    let heroImageId: number | undefined

    if (heroImage && typeof heroImage.size === 'number' && heroImage.size > 0) {
      try {
        const arrayBuffer = await heroImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const media = await payload.create({
          collection: 'media',
          data: {
            alt: title,
          },
          file: {
            data: buffer,
            name: heroImage.name || 'upload.jpg',
            size: heroImage.size,
            mimetype: heroImage.type || 'image/jpeg',
          },
        })
        heroImageId = media.id
      } catch (uploadErr: any) {
        console.error('[updatePostAction] media upload failed:', uploadErr.message || uploadErr)
        return { error: `Media upload failed: ${uploadErr.message || 'unknown error'}` }
      }
    }

    const updateData: any = {
      title,
      slug,
      author,
      date,
      category,
      excerpt,
      content,
    }

    if (heroImageId) {
      updateData.heroImage = heroImageId
    }

    await payload.update({
      collection: 'posts',
      id,
      data: updateData,
    })

    revalidatePath('/blog')
    if (oldSlug && oldSlug !== slug) {
      revalidatePath(`/blog/${oldSlug}`)
    }
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error('[updatePostAction] uncaught error:', error.message || error)
    return { error: error.message || 'Failed to update post' }
  }
}

export async function deletePostAction(id: string) {
  const user = await getAuthUser()
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.delete({
      collection: 'posts',
      id,
    })
    revalidatePath('/blog')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to delete post' }
  }
}
