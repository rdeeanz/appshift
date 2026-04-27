import React from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-date',
    depth: 1,
  })

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-surface border-b border-border py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-[2.5rem] font-bold text-txt mb-3 font-serif tracking-tight leading-tight">
            AppShift Blog
          </h1>
          <p className="text-muted text-[1.125rem] max-w-2xl leading-relaxed">
            Insights, news, and deep dives into the world of high-quality software and developer tools.
          </p>
        </div>
      </section>

      {/* Blog Listing Grid */}
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post: any) => (
            <article key={post.id} className="group bg-surface border border-border rounded-3xl overflow-hidden hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 flex flex-col">
              {/* Thumbnail Placeholder */}
              <div className="aspect-[2/1] bg-surface-alt flex items-center justify-center border-b border-border relative overflow-hidden">
                {post.heroImage?.url ? (
                  <img 
                    src={post.heroImage.url} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <span className="text-[4rem] group-hover:scale-110 transition-transform duration-500 opacity-20 select-none">
                    📝
                  </span>
                )}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-type py-1 px-3 bg-bg shadow-sm border-none font-bold text-[0.75rem]">{post.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-[1.5rem] font-bold text-txt mb-4 font-serif leading-tight group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-muted text-[1rem] leading-[1.7] mb-8 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Footer: Author & Date */}
                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accentLight border border-accent/10 flex items-center justify-center text-accent font-black text-[0.875rem] shadow-sm">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[0.875rem] font-bold text-txt">{post.author}</p>
                      <div className="flex items-center gap-1.5 text-[0.75rem] text-faint font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-[0.875rem] font-bold text-accent hover:underline flex items-center gap-1 transition-all group-hover:gap-2">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
