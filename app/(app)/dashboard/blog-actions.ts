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

export async function createPostAction(formData: FormData) {
  const user = await getAuthUser()
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const author = formData.get('author') as string
  const date = formData.get('date') as string
  const category = formData.get('category') as string
  const heroImage = formData.get('heroImage') as File
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string

  const payload = await getPayload({ config: configPromise })

  try {
    let heroImageId: number | undefined

    if (heroImage && heroImage.size > 0) {
      const arrayBuffer = await heroImage.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: title,
        },
        file: {
          data: buffer,
          name: heroImage.name,
          size: heroImage.size,
          mimetype: heroImage.type,
        },
      })
      heroImageId = media.id
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
    return { error: error.message || 'Failed to create post' }
  }
}

export async function updatePostAction(id: string, formData: FormData) {
  const user = await getAuthUser()
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const author = formData.get('author') as string
  const date = formData.get('date') as string
  const category = formData.get('category') as string
  const heroImage = formData.get('heroImage') as File
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string

  const payload = await getPayload({ config: configPromise })

  try {
    // Fetch existing post to get old slug for cache revalidation
    const existing = await payload.findByID({
      collection: 'posts',
      id,
    })
    const oldSlug = existing?.slug as string | undefined

    let heroImageId: number | undefined

    if (heroImage && heroImage.size > 0) {
      const arrayBuffer = await heroImage.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: title,
        },
        file: {
          data: buffer,
          name: heroImage.name,
          size: heroImage.size,
          mimetype: heroImage.type,
        },
      })
      heroImageId = media.id
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
