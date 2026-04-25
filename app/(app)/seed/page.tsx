import { seed } from '@/lib/seed'

export default async function SeedPage() {
  await seed()
  return <div>Database seeded successfully!</div>
}
