import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppCard } from '@/components/sections/app-card'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const payload = await getPayload({ config: configPromise })
  
  const resolvedSearchParams = await searchParams
  const category = resolvedSearchParams.category as string | undefined
  const platform = resolvedSearchParams.platform as string | undefined
  const page = parseInt(resolvedSearchParams.page as string || '1', 10)

  // Fetch all apps (with optional filters)
  const query: any = {}
  const whereClauses: any[] = []

  if (category) {
    whereClauses.push({
      'category.name': {
        equals: category,
      },
    })
  }

  if (platform) {
    whereClauses.push({
      platforms: {
        contains: platform,
      },
    })
  }

  if (whereClauses.length > 0) {
    query.where = {
      and: whereClauses,
    }
  }

  const apps = await payload.find({
    collection: 'apps',
    ...query,
    sort: '-createdAt',
    limit: 8,
    page,
  })

  const categories = await payload.find({
    collection: 'categories',
  })

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="mb-10">
          <h1 className="text-[2rem] font-bold text-txt mb-2 font-serif tracking-tight">Browse Directory</h1>
          <p className="text-muted text-[1rem]">Explore the complete database of newly submitted software.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-[5.5rem] flex flex-col gap-8">
              <div>
                <h3 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="flex flex-col gap-1.5">
                  <a 
                    href="/browse" 
                    className={`px-3 py-2 rounded-lg text-[0.875rem] transition-all ${!category ? 'bg-accentLight text-accent font-semibold' : 'text-muted hover:bg-surface-alt'}`}
                  >
                    All Categories
                  </a>
                  {categories.docs.map((cat, i) => (
                    <a 
                      key={i} 
                      href={`/browse?category=${encodeURIComponent(cat.name)}`}
                      className={`px-3 py-2 rounded-lg text-[0.875rem] transition-all ${category === cat.name ? 'bg-accentLight text-accent font-semibold' : 'text-muted hover:bg-surface-alt'}`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  License
                </h3>
                <div className="flex flex-col gap-2">
                  {['Free', 'Open Source', 'Freemium', 'Paid', 'Proprietary'].map(license => (
                    <label key={license} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-border bg-surface group-hover:border-accent transition-all"></div>
                      <span className="text-[0.875rem] text-muted group-hover:text-txt transition-colors">{license}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[0.8125rem] font-bold text-txt uppercase tracking-wider mb-4">Platform</h3>
                <div className="flex flex-wrap gap-2">
                  {['Mac', 'Windows', 'Linux', 'iOS', 'Android', 'Online'].map(plat => (
                    <button key={plat} className="plat-tag px-3 py-1.5 hover:border-accent hover:text-accent transition-all cursor-pointer">
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                <input 
                  type="text" 
                  placeholder="Search in directory..." 
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 pl-10 text-[0.875rem] outline-none focus:border-accent shadow-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[0.8125rem] text-faint">Sort by:</span>
                <select className="bg-surface border border-border rounded-lg px-3 py-1.5 text-[0.8125rem] outline-none focus:border-accent">
                  <option>Newest First</option>
                  <option>Most Popular</option>
                  <option>Recently Updated</option>
                </select>
              </div>
            </div>

            <div className="mb-6 text-[0.875rem] text-muted">
              Showing <strong>{apps.totalDocs}</strong> apps 
              {category && <span> in <strong>{category}</strong></span>}
              {platform && <span> on <strong>{platform}</strong></span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apps.docs.map((app: any, i) => (
                <AppCard key={i} app={app} />
              ))}
            </div>

            {apps.totalDocs === 0 && (
              <div className="py-20 text-center bg-surface border border-dashed border-border rounded-2xl">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-[1.125rem] font-bold text-txt mb-2">No apps found</h3>
                <p className="text-muted text-[0.875rem]">Try adjusting your filters or search query.</p>
                <button className="mt-6 btn-primary">Clear all filters</button>
              </div>
            )}

            {/* Pagination Controls */}
            {apps.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <a
                  href={`/browse?${category ? `category=${encodeURIComponent(category)}&` : ''}${platform ? `platform=${encodeURIComponent(platform)}&` : ''}page=${apps.prevPage || 1}`}
                  className={`px-4 py-2 border border-border rounded-lg text-[0.875rem] font-medium transition-all ${!apps.hasPrevPage ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-surface-alt'}`}
                >
                  Previous
                </a>
                
                <div className="flex items-center gap-1">
                  {(() => {
                    const total = apps.totalPages
                    const current = apps.page
                    const pages: (number | string)[] = []
                    const addPage = (p: number) => pages.push(p)
                    const addEllipsis = () => { if (pages[pages.length - 1] !== '...') pages.push('...') }

                    if (total <= 7) {
                      for (let p = 1; p <= total; p++) addPage(p)
                    } else {
                      if (current <= 4) {
                        for (let p = 1; p <= 5; p++) addPage(p)
                        addEllipsis()
                        addPage(total)
                      } else if (current >= total - 3) {
                        addPage(1)
                        addEllipsis()
                        for (let p = total - 4; p <= total; p++) addPage(p)
                      } else {
                        addPage(1)
                        addEllipsis()
                        for (let p = current - 1; p <= current + 1; p++) addPage(p)
                        addEllipsis()
                        addPage(total)
                      }
                    }
                    return pages.map((p, i) =>
                      typeof p === 'number' ? (
                        <a
                          key={p}
                          href={`/browse?${category ? `category=${encodeURIComponent(category)}&` : ''}${platform ? `platform=${encodeURIComponent(platform)}&` : ''}page=${p}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-[0.875rem] transition-all ${apps.page === p ? 'bg-accent text-white font-bold' : 'text-muted hover:bg-surface-alt'}`}
                        >
                          {p}
                        </a>
                      ) : (
                        <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-[0.875rem] text-muted">…</span>
                      )
                    )
                  })()}
                </div>

                <a
                  href={`/browse?${category ? `category=${encodeURIComponent(category)}&` : ''}${platform ? `platform=${encodeURIComponent(platform)}&` : ''}page=${apps.nextPage || apps.totalPages}`}
                  className={`px-4 py-2 border border-border rounded-lg text-[0.875rem] font-medium transition-all ${!apps.hasNextPage ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-surface-alt'}`}
                >
                  Next
                </a>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
