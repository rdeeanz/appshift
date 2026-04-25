import React from 'react'
import { Search } from 'lucide-react'

interface HeroProps {
  badgeText?: string
  heading?: string
  subheading?: string
}

export function Hero({ badgeText, heading, subheading }: HeroProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="max-w-[720px] mx-auto px-5 py-16 md:py-14 text-center animate-fade-up">
        {badgeText && (
          <div className="inline-flex items-center gap-2 bg-successBg border border-successBorder rounded-full px-3.5 py-1.5 text-[0.8125rem] text-successText mb-6">
            <span className="pulse-dot"></span>
            {badgeText}
          </div>
        )}
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-txt leading-tight mb-4 tracking-[-0.02em] font-serif">
          {heading?.split('<br/>').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < heading.split('<br/>').length - 1 && <br />}
            </React.Fragment>
          )) || heading}
        </h1>
        <p className="text-[1.0625rem] text-muted leading-[1.65] max-w-[520px] mx-auto mb-8">
          {subheading}
        </p>
        <div className="max-w-[560px] mx-auto mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[1.125rem] h-[1.125rem] text-faint" />
          <input 
            type="text" 
            placeholder="Search by name, description, type, or features…" 
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-12 text-[0.9375rem] text-txt shadow-sm focus:border-accent focus:ring-3 focus:ring-accent/12 outline-none transition-all" 
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {['All', 'Free', 'Open Source', 'AI-Powered', 'Mac', 'Windows', 'Mobile', 'Online'].map(chip => (
            <button key={chip} className="bg-surface border border-border rounded-full px-3.5 py-1 text-[0.8125rem] text-muted hover:border-accent hover:text-accent transition-all">
              {chip}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
