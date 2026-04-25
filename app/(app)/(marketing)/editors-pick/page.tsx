import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppCard } from '@/components/sections/app-card'

export const dynamic = 'force-dynamic'

export default async function EditorsPickPage() {
  const payload = await getPayload({ config: configPromise })

  const apps = await payload.find({
    collection: 'apps',
    where: {
      isFeatured: {
        equals: true,
      },
    },
    sort: '-createdAt',
    limit: 100,
  })

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="mb-10">
          <h1 className="text-[2.5rem] font-bold text-txt mb-2 font-serif tracking-tight">Editor&apos;s Picks</h1>
          <p className="text-muted text-[1.125rem]">Our hand-picked selection of high-quality software and tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.docs.map((app, i) => (
            <AppCard key={i} app={app} />
          ))}
        </div>

        {apps.totalDocs === 0 && (
          <div className="py-20 text-center bg-surface border border-dashed border-border rounded-2xl">
            <h3 className="text-[1.125rem] font-bold text-txt">No Editor&apos;s Picks yet</h3>
          </div>
        )}
      </div>
    </div>
  )
}
