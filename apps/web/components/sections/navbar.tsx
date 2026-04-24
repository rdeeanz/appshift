"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10" style={{ background: "rgba(10, 15, 30, 0.85)", backdropFilter: "blur(16px)" }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-txt" aria-label="AppShift Home">
          <span className="text-accent text-2xl">⬡</span>AppShift
        </a>
        
        <div className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#" className="hover:text-txt transition">Browse</a>
          <a href="#" className="text-txt font-semibold">New Apps</a>
          <a href="#" className="hover:text-txt transition">Categories</a>
          <a href="#" className="hover:text-txt transition">Submit App</a>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search apps..." 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-txt placeholder-muted focus:outline-none focus:border-accent w-44" 
              aria-label="Search apps"
            />
            <Search className="absolute right-2.5 top-2 w-4 h-4 text-muted" />
          </div>
          <a href="#" className="text-sm text-muted hover:text-txt transition">Sign In</a>
          <a href="#" className="text-sm bg-accent hover:bg-accent/80 text-white px-4 py-1.5 rounded-lg transition font-medium">Submit App</a>
        </div>
        
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-txt" aria-label="Toggle menu">
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {mobileMenu && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-white/10 pt-3">
          <a href="#" className="text-muted hover:text-txt">Browse</a>
          <a href="#" className="text-txt font-semibold">New Apps</a>
          <a href="#" className="text-muted hover:text-txt">Categories</a>
          <a href="#" className="text-muted hover:text-txt">Submit App</a>
          <a href="#" className="text-muted hover:text-txt">Sign In</a>
          <a href="#" className="bg-accent text-white text-center px-4 py-2 rounded-lg">Submit App</a>
        </div>
      )}
    </nav>
  );
}
