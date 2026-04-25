import { seed } from '@/lib/seed'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SeedPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const { token } = await searchParams
  const seedToken = process.env.SEED_TOKEN

  if (
    process.env.NODE_ENV === 'production' ||
    !seedToken ||
    Array.isArray(token) ||
    token !== seedToken
  ) {
    notFound()
  }

  await seed()
  return <div>Database seeded successfully!</div>
}
