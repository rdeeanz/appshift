import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeaturedSpotlight } from '@/components/sections/featured-spotlight'
import { AppCard } from '@/components/sections/app-card'
import Link from 'next/link'

export const revalidate = 60 // revalidate every 60 seconds

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Hero and Stats data
  const heroData = await payload.findGlobal({
    slug: 'hero',
  })

  const statsData = await payload.findGlobal({
    slug: 'stats',
  })

  // Fetch Featured Apps
  const featuredApps = await payload.find({
    collection: 'apps',
    where: {
      isFeatured: {
        equals: true,
      },
    },
    limit: 3,
  })

  // Fetch Recent Apps (top 6)
  const recentApps = await payload.find({
    collection: 'apps',
    sort: '-createdAt',
    limit: 6,
  })

  // Fetch Categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 8,
  })

  return (
    <div>
      <Hero 
        badgeText={heroData.badgeText} 
        heading={heroData.heading} 
        subheading={heroData.subheading} 
      />
      
      <StatsBar items={statsData.items} />

      <FeaturedSpotlight apps={featuredApps.docs} />

      {/* Categories Section */}
      <section className="bg-surface border-y border-border py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[1.25rem] font-bold text-txt mb-8 tracking-tight text-center font-serif">Explore by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.docs.map((cat, i) => (
              <Link 
                key={i} 
                href={`/browse?category=${cat.name}`}
                className="flex flex-col items-center gap-3 p-4 bg-bg border border-border rounded-xl hover:border-accent hover:shadow-sm transition-all text-center group"
              >
                <span className="text-[1.5rem] group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[0.75rem] font-bold text-muted group-hover:text-txt transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Submissions Section */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[1.5rem] font-bold text-txt tracking-tight font-serif">New Submissions</h2>
            <p className="text-[0.875rem] text-muted">The latest software discovered by our community.</p>
          </div>
          <Link href="/browse" className="btn-primary flex items-center gap-2">
            View All Apps
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentApps.docs.map((app, i) => (
            <AppCard key={i} app={app} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/browse" className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-accent hover:underline">
            View all {recentApps.totalDocs} apps in the directory →
          </Link>
        </div>
      </section>

      {/* Newsletter Section (Static for now, can be moved to Globals later) */}
      <section className="bg-accentLight py-16">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-[1.75rem] font-bold text-txt mb-4 tracking-tight font-serif">Stay Updated</h2>
          <p className="text-[1rem] text-muted mb-8 leading-[1.6]">
            Join 2,500+ developers getting a weekly digest of the best new software. No spam, just high-quality tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-surface border border-border rounded-xl px-5 py-3.5 text-[0.9375rem] outline-none focus:border-accent transition-all shadow-sm"
            />
            <button className="btn-primary whitespace-nowrap px-8 py-3.5 rounded-xl text-[1rem] shadow-lg shadow-accent/20">
              Subscribe Free
            </button>
          </div>
          <p className="mt-4 text-[0.75rem] text-faint italic">
            Trusted by teams at Vercel, Stripe, and Linear.
          </p>
        </div>
      </section>
    </div>
  )
}
