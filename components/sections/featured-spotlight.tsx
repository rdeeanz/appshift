import React from 'react'
import Link from 'next/link'
import { AppCard } from './app-card'

interface FeaturedSpotlightProps {
  apps?: any[]
}

export function FeaturedSpotlight({ apps }: FeaturedSpotlightProps) {
  if (!apps || apps.length === 0) return null

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[1.5rem] font-bold text-txt tracking-tight font-serif">Editor&apos;s Pick</h2>
          <p className="text-[0.875rem] text-muted">Hand-picked software we think you&apos;ll love.</p>
        </div>
        <Link href="/editors-pick" className="text-[0.875rem] font-semibold text-accent hover:underline transition-all">
          View All Picks →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, i) => (
          <AppCard key={i} app={app} variant="featured" />
        ))}
      </div>
    </section>
  )
}
