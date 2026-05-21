import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  // Fetch all apps to calculate counts (efficient for smaller datasets)
  const apps = await payload.find({
    collection: 'apps',
    limit: 1000,
    depth: 1, // Ensure category is populated to get its name
  })

  // Count apps per category
  const categoryCounts: Record<string, number> = {}
  apps.docs.forEach((app: any) => {
    const catName = app.category?.name
    if (catName) {
      categoryCounts[catName] = (categoryCounts[catName] || 0) + 1
    }
  })

  // Count apps per platform
  const platformCounts: Record<string, number> = {}
  apps.docs.forEach((app: any) => {
    const plats = app.platforms?.split(',').map((p: string) => p.trim()) || []
    plats.forEach((p: string) => {
      if (p) {
        platformCounts[p] = (platformCounts[p] || 0) + 1
      }
    })
  })

  const platforms = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="bg-bg min-h-screen">
      {/* Header Section */}
      <section className="border-b border-border bg-surface py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-[2.5rem] font-bold text-txt mb-3 font-serif tracking-tight">Browse by Category</h1>
          <p className="text-muted text-[1.125rem] max-w-2xl leading-relaxed">
            Explore the best software alternatives and developer tools organized by their primary function and supported operating systems.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Panel: Categories */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h2 className="text-[1.25rem] font-bold text-txt font-serif flex items-center gap-3">
                Software Categories
                <span className="text-[0.75rem] font-sans font-bold text-muted bg-surface-alt px-2.5 py-1 rounded-full border border-border">
                  {categories.totalDocs}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.docs.map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/browse?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center justify-between p-5 bg-surface border border-border rounded-2xl hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[1.75rem] transition-transform group-hover:scale-110">{cat.icon}</span>
                    <span className="text-[1rem] font-bold text-txt group-hover:text-accent transition-colors">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.8125rem] font-bold text-muted bg-surface-alt px-2 py-0.5 rounded-md border border-border">
                      {categoryCounts[cat.name] || 0}
                    </span>
                    <ChevronRight className="w-4 h-4 text-faint group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Panel: Platforms */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h2 className="text-[1.25rem] font-bold text-txt font-serif flex items-center gap-3">
                Popular Platforms
                <span className="text-[0.75rem] font-sans font-bold text-muted bg-surface-alt px-2.5 py-1 rounded-full border border-border">
                  {platforms.length}
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {platforms.map(([plat, count], i) => (
                <Link 
                  key={i} 
                  href={`/browse?platform=${encodeURIComponent(plat)}`}
                  className="flex items-center gap-3 px-5 py-3 bg-surface border border-border rounded-full hover:border-accent hover:bg-accentLight transition-all group"
                >
                  <span className="text-[0.9375rem] font-bold text-muted group-hover:text-accent transition-colors">{plat}</span>
                  <span className="text-[0.75rem] font-bold text-faint border-l border-border pl-3 group-hover:border-accent/30 group-hover:text-accent/70">
                    {count}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-16 p-8 bg-surface border border-border rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[4rem] opacity-5 select-none font-serif">Tip</div>
              <h3 className="text-[1rem] font-bold text-txt mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                Filtering Tips
              </h3>
              <p className="text-[0.9375rem] text-muted leading-relaxed">
                You can browse the entire directory and use the sidebar filters to narrow down your results by license type, specific platform support, or category.
              </p>
              <Link href="/browse" className="mt-6 inline-flex items-center gap-2 text-accent font-bold text-[0.875rem] hover:underline">
                View all apps in directory →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
