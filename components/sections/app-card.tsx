import React from 'react'
import Link from 'next/link'
import { ExternalLink, Info } from 'lucide-react'

interface AppCardProps {
  app: {
    id: number | string
    name: string
    link: string
    description: string
    license?: string
    type?: string
    platforms?: string
    features?: string
    origin?: string
    isFeatured?: boolean
  }
  variant?: 'vertical' | 'featured'
}

export function AppCard({ app, variant = 'vertical' }: AppCardProps) {
  const platforms = app.platforms?.split(',').map(p => p.trim()) || []
  const features = app.features?.split(',').map(f => f.trim()) || []

  const isFreemium = app.license?.toLowerCase().includes('freemium')

  const firstLicense = app.license?.split(',')[0] || ''
  const parenthesizedMatch = firstLicense.match(/(\(.*?\))/)
  const displayLicense = parenthesizedMatch ? parenthesizedMatch[1] : firstLicense

  return (
    <div className={`app-card group ${app.isFeatured ? 'ring-2 ring-accent/20' : ''} ${variant === 'featured' ? 'md:col-span-2 lg:col-span-3 overflow-hidden' : ''}`}>
      {variant === 'featured' ? (
        <div className="flex flex-col md:flex-row h-full md:min-h-[500px]">
          {/* Left Column (Content) */}
          <div className="p-6 md:p-8 flex flex-col w-full md:w-1/2 lg:w-5/12 flex-shrink-0">
            {/* Top row: Icon, Name, Badge, Category, External Link */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accentLight rounded-[var(--radius-lg)] flex items-center justify-center border border-accent/10 flex-shrink-0">
                  <span className="text-[1.5rem] font-bold text-accent">{app.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-[1.25rem] font-bold text-txt group-hover:text-accent transition-colors flex items-center gap-2">
                    <Link href={`/apps/${app.id}`} className="hover:underline">
                      {app.name}
                    </Link>
                    {app.isFeatured && <span className="badge badge-new">Editor&apos;s Pick</span>}
                  </h3>
                  <p className="text-[0.875rem] text-muted font-medium mt-1">{app.type}</p>
                </div>
              </div>
              <a 
                href={app.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:bg-accent hover:text-white hover:border-accent transition-all flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Description */}
            <p className="text-[1rem] text-muted leading-[1.7] mb-8">
              {app.description}
            </p>

            {/* Bottom row: Platform tags & Pricing badges */}
            <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {platforms.map((plat, i) => (
                  <span key={i} className="plat-tag px-3 py-1.5 text-[0.75rem]">{plat}</span>
                ))}
              </div>
              
              <div className="flex items-center flex-wrap gap-2">
                {isFreemium && <span className="badge badge-freemium text-[0.75rem] px-3 py-1">Freemium</span>}
                <span className={`badge ${displayLicense === 'Free' ? 'badge-free' : 'badge-type'} text-[0.75rem] px-3 py-1`}>{displayLicense}</span>
                {app.origin && (
                  <span className="ml-2 text-[0.75rem] text-faint flex items-center gap-1 border-l border-border pl-3">
                    <Info className="w-3.5 h-3.5" />
                    {app.origin}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Thumbnail) */}
          <div className="w-full md:w-1/2 lg:w-7/12 bg-surface-alt border-t md:border-t-0 md:border-l border-border flex items-center justify-center relative min-h-[250px] md:min-h-full">
            <div className="text-muted text-[4rem] opacity-10">📸</div>
            {/* Future image tag can go here, e.g., <img src="..." className="w-full h-full object-cover absolute inset-0" /> */}
          </div>
        </div>
      ) : (
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-accentLight rounded-[var(--radius-lg)] flex items-center justify-center border border-accent/10">
                <span className="text-[1.25rem] font-bold text-accent">{app.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-[1rem] font-bold text-txt group-hover:text-accent transition-colors flex items-center gap-2">
                  <Link href={`/apps/${app.id}`} className="hover:underline">
                    {app.name}
                  </Link>
                  {app.isFeatured && <span className="badge badge-new">Editor&apos;s Pick</span>}
                </h3>
                <p className="text-[0.75rem] text-muted font-medium">{app.type}</p>
              </div>
            </div>
            <a 
              href={app.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:bg-accent hover:text-white hover:border-accent transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-[0.8125rem] text-muted leading-[1.6] mb-4 line-clamp-2 min-h-[2.6rem]">
            {app.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {platforms.slice(0, 3).map((plat, i) => (
              <span key={i} className="plat-tag">{plat}</span>
            ))}
            {platforms.length > 3 && <span className="plat-tag">+{platforms.length - 3}</span>}
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isFreemium && <span className="badge badge-freemium">Freemium</span>}
              <span className={`badge ${displayLicense === 'Free' ? 'badge-free' : 'badge-type'}`}>{displayLicense}</span>
            </div>
            {app.origin && (
              <span className="text-[0.6875rem] text-faint flex items-center gap-1">
                <Info className="w-3 h-3" />
                {app.origin}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
