import React from 'react'

interface StatsBarProps {
  items?: Array<{ value?: string | null; label?: string | null }>
}

export function StatsBar({ items }: StatsBarProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="bg-surface border-b border-border py-4">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap justify-around gap-y-6">
        {items.map((stat, i) => (
          <div key={i} className="text-center min-w-[140px] relative px-4 first:pl-0 last:pr-0">
            <div className="text-[1.25rem] font-bold text-accent mb-0.5">{stat.value || ''}</div>
            <div className="text-[0.75rem] font-medium text-muted uppercase tracking-wider">{stat.label || ''}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
