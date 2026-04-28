import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ExternalLink, Info, Globe, Shield, Monitor } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  let app: any

  try {
    app = await payload.findByID({
      collection: 'apps',
      id: slug,
      depth: 1, // To get category details
    })
  } catch (error) {
    return notFound()
  }

  if (!app) return notFound()

  const platforms = app.platforms?.split(',').map((p: string) => p.trim()) || []
  const features = app.features?.split(',').map((f: string) => f.trim()) || []

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-surface border-b border-border pt-12 pb-8">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-accentLight rounded-2xl flex items-center justify-center border border-accent/10 flex-shrink-0 shadow-sm">
                <span className="text-[2.5rem] font-bold text-accent">{app.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-[2rem] font-bold text-txt font-serif tracking-tight leading-tight">
                    {app.name}
                  </h1>
                  {app.isFeatured && (
                    <span className="badge badge-new text-[0.75rem] px-3 py-1">Editor&apos;s Pick</span>
                  )}
                  {app.category && (
                    <Link 
                      href={`/browse?category=${encodeURIComponent(app.category.name)}`}
                      className="badge badge-type text-[0.75rem] px-3 py-1 hover:border-accent hover:text-accent transition-colors"
                    >
                      {app.category.name}
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-muted">
                  <span className="text-[0.9375rem] font-medium">{app.type}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={app.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary flex items-center gap-2 h-12 px-6 shadow-lg shadow-accent/20"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-[0.875rem] border-t border-border/50 pt-6">
            <div className="flex items-center gap-2 text-muted">
              <Monitor className="w-4 h-4 text-faint" />
              <span className="font-medium">{platforms.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <Shield className="w-4 h-4 text-faint" />
              <span className="font-medium">{app.license}</span>
            </div>
            {app.origin && (
              <div className="flex items-center gap-2 text-muted">
                <Globe className="w-4 h-4 text-faint" />
                <span className="font-medium">{app.origin}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Section: Screenshot & App Info */}
      <div className="max-w-[1100px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Screenshot Column */}
          <div className="lg:col-span-8">
            <div className="h-full min-h-[300px] bg-surface-alt border border-border rounded-3xl flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="text-muted text-[6rem] opacity-5">📸</div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-bg/80 backdrop-blur-md rounded-xl border border-border/50 text-[0.8125rem] text-faint text-center">
                Screenshot placeholder for {app.name}
              </div>
            </div>
          </div>

          {/* App Info Column */}
          <div className="lg:col-span-4">
            <div className="h-full bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-[1.125rem] font-bold text-txt mb-6 font-serif">App Info</h2>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5 pb-5 border-b border-border/50">
                  <span className="text-[0.75rem] font-bold text-faint uppercase tracking-wider">License Type</span>
                  <span className="text-[0.9375rem] font-semibold text-txt">{app.license}</span>
                </div>

                <div className="flex flex-col gap-1.5 pb-5 border-b border-border/50">
                  <span className="text-[0.75rem] font-bold text-faint uppercase tracking-wider">Origin Country</span>
                  <span className="text-[0.9375rem] font-semibold text-txt">{app.origin || 'Not specified'}</span>
                </div>

                <div className="flex flex-col gap-1.5 pb-5 border-b border-border/50">
                  <span className="text-[0.75rem] font-bold text-faint uppercase tracking-wider">Developer / Type</span>
                  <span className="text-[0.9375rem] font-semibold text-txt">{app.type}</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.75rem] font-bold text-faint uppercase tracking-wider">Available on</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {platforms.map((plat: string, i: number) => (
                      <span key={i} className="text-[0.8125rem] font-bold text-muted bg-surface-alt px-2 py-0.5 rounded border border-border">
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-faint text-[0.8125rem]">
                  <Info className="w-4 h-4" />
                  <span>Data provided by AppShift community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: About & Features */}
      <div className="max-w-[1100px] mx-auto px-5 mt-4">
        <div className="flex flex-col gap-12">
          {/* About Section */}
          <div>
            <h2 className="text-[1.25rem] font-bold text-txt mb-6 font-serif flex items-center gap-2">
              About {app.name}
            </h2>
            <div className="prose prose-slate max-w-none text-muted text-[1.0625rem] leading-[1.8]">
              {app.description}
            </div>
          </div>

          {/* Features Section */}
          {features.length > 0 && (
            <div>
              <h2 className="text-[1.25rem] font-bold text-txt mb-6 font-serif">Features</h2>
              <div className="flex flex-wrap gap-2">
                {features.map((feature: string, i: number) => (
                  <span key={i} className="plat-tag px-4 py-2 text-[0.875rem] font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
