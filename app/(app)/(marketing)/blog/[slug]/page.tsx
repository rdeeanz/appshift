import React from 'react'
import Link from 'next/link'
import { Calendar, ChevronLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const post = posts[0]
  if (!post) return notFound()

  return (
    <article className="bg-bg min-h-screen pb-24">
      {/* Article Header */}
      <header className="pt-16 pb-12">
        <div className="max-w-[800px] mx-auto px-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent font-bold text-[0.875rem] mb-8 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <span className="badge badge-type py-1.5 px-4 text-[0.8125rem] font-bold">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-txt mb-8 font-serif leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-border/50">
            <div className="w-12 h-12 rounded-full bg-accentLight border border-accent/10 flex items-center justify-center text-accent font-black text-[1.125rem] shadow-sm">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-[1rem] font-bold text-txt">{post.author}</p>
              <div className="flex items-center gap-2 text-[0.875rem] text-faint font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-[680px] mx-auto w-full h-[300px] md:h-[400px] bg-surface-alt border border-border flex items-center justify-center relative overflow-hidden mb-16 rounded-3xl">
        {post.heroImage?.url ? (
          <img 
            src={post.heroImage.url} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <span className="text-[12rem] opacity-10 select-none">
            📝
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent pointer-events-none" />
      </div>

      {/* Article Content */}
      <div className="max-w-[680px] mx-auto px-5">
        <div
          className="prose prose-lg prose-slate max-w-none 
          text-muted text-[1.1875rem] leading-[1.8] font-serif
          prose-headings:text-txt prose-headings:font-serif prose-headings:font-bold
          prose-p:mb-8 prose-strong:text-txt"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-12 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-[0.875rem] font-bold text-faint uppercase tracking-widest">Share</p>
            <div className="flex gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-alt transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
          <Link href="/blog" className="btn-primary px-8 h-12">
            Back to all stories
          </Link>
        </div>
      </div>
    </article>
  )
}
