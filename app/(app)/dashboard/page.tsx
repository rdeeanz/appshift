import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminDashboardUI } from './AdminDashboardUI'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const payload = await getPayload({ config: configPromise })
  const headers = await nextHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/sign-in')
  }

  if (user.role !== 'admin' && user.role !== 'editor') {
    redirect('/')
  }

  const canManageUsers = user.role === 'admin'

  // Fetch data for the dashboard
  const apps = await payload.find({
    collection: 'apps',
    limit: 100,
    sort: '-createdAt',
    depth: 1,
  })

  const users = canManageUsers
    ? await payload.find({
        collection: 'users',
        limit: 100,
        sort: '-createdAt'
      })
    : { docs: [], totalDocs: 0 }

  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-date',
    depth: 1,
  })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const stats = {
    totalApps: apps.totalDocs,
    totalUsers: users.totalDocs,
    pendingSubmissions: 0,
    totalBlogPosts: posts.totalDocs
  }

  return (
    <AdminDashboardUI 
      user={user}
      stats={stats}
      apps={apps.docs}
      users={users.docs}
      posts={posts.docs}
      categories={categories.docs}
      canManageUsers={canManageUsers}
    />
  )
}
