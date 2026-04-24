"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface HeroProps {
  settings: {
    heroTitle: string;
    heroSubtitle: string;
    heroBadge: string;
  };
}

const CHIPS = ["All", "Free", "Open Source", "AI-Powered", "Mac", "Windows", "Mobile", "Online"];

export function Hero({ settings }: HeroProps) {
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("All");

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 anim-grad opacity-10"></div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)" }}></div>
      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          {settings.heroBadge}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-indigo-200 to-teal-200 bg-clip-text text-transparent leading-tight">
          {settings.heroTitle}
        </h1>
        
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
          {settings.heroSubtitle}
        </p>
        
        <div className="max-w-xl mx-auto mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by name, description, type, or features..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-txt placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition" 
            aria-label="Search apps"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-txt text-xl" aria-label="Clear search">×</button>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter chips">
          {CHIPS.map((c) => (
            <button 
              key={c} 
              onClick={() => setActiveChip(c)} 
              className={`text-sm px-4 py-1.5 rounded-full border transition duration-200 ${activeChip === c ? "bg-accent/30 border-accent text-txt" : "border-white/10 text-muted hover:text-txt hover:bg-accent/20"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
