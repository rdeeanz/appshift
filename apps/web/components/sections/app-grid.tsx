"use client";

import { useState, useMemo } from "react";
import { AppCard, type App } from "./app-card";

interface AppGridProps {
  initialApps: App[];
}

export function AppGrid({ initialApps }: AppGridProps) {
  const [search, setSearch] = useState("");
  const [licFilter, setLicFilter] = useState("all");
  const [platFilter, setPlatFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [mobSidebar, setMobSidebar] = useState(false);

  const togglePlat = (p: string) => setPlatFilter(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  
  const resetFilters = () => {
    setSearch("");
    setLicFilter("all");
    setPlatFilter([]);
    setTypeFilter("all");
    setSortBy("newest");
  };

  const filtered = useMemo(() => {
    let r = [...initialApps];
    if (search) {
      const s = search.toLowerCase();
      r = r.filter(a => a.name.toLowerCase().includes(s) || a.description.toLowerCase().includes(s) || a.type.toLowerCase().includes(s));
    }
    
    if (licFilter !== "all") {
      if (licFilter === "free") {
        r = r.filter(a => a.license.startsWith("Free"));
      } else if (licFilter === "freemium") {
        r = r.filter(a => a.license.startsWith("Freemium"));
      } else if (licFilter === "payonce") {
        r = r.filter(a => a.license.startsWith("Pay once"));
      } else if (licFilter === "paid") {
        r = r.filter(a => a.license.startsWith("Paid"));
      }
    }

    if (platFilter.length > 0) {
      r = r.filter(a => platFilter.some(p => a.platforms.includes(p)));
    }

    if (typeFilter !== "all") {
      r = r.filter(a => a.type === typeFilter);
    }

    if (sortBy === "name") {
      r.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "license") {
      r.sort((a, b) => a.license.localeCompare(b.license));
    } else {
      // Default newest
    }

    return r;
  }, [initialApps, search, licFilter, platFilter, typeFilter, sortBy]);

  const allTypes = Array.from(new Set(initialApps.map(a => a.type)));
  const allPlats = Array.from(new Set(initialApps.flatMap(a => a.platforms))).sort();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" aria-label="App listing">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className={`lg:w-1/4 ${mobSidebar ? "block" : "hidden"} lg:block`}>
          <div className="glass p-6 lg:sticky lg:top-24 space-y-6">
            <h3 className="text-lg font-bold text-txt">Filters</h3>
            
            <fieldset>
              <legend className="text-sm font-semibold text-txt mb-2">License</legend>
              {[["all", "All Licenses"], ["free", "Free"], ["freemium", "Freemium"], ["payonce", "Pay Once"], ["paid", "Paid"]].map(([v, l]) => (
                <label key={v} className="flex items-center gap-2 text-sm text-muted py-1 cursor-pointer hover:text-txt transition">
                  <input type="radio" name="lic" value={v} checked={licFilter === v} onChange={() => setLicFilter(v)} className="accent-accent" />
                  {l}
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-txt mb-2">Platform</legend>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {allPlats.map(p => (
                  <label key={p} className="flex items-center gap-2 text-sm text-muted py-0.5 cursor-pointer hover:text-txt transition">
                    <input type="checkbox" checked={platFilter.includes(p)} onChange={() => togglePlat(p)} className="accent-accent rounded" />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-txt mb-2">App Type</legend>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-txt focus:outline-none focus:border-accent">
                <option value="all">All Types</option>
                {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-txt mb-2">Sort By</legend>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-txt focus:outline-none focus:border-accent">
                <option value="newest">Newest First</option>
                <option value="name">Name A–Z</option>
                <option value="license">License Type</option>
              </select>
            </fieldset>

            <div className="flex gap-2 pt-2">
              <button onClick={resetFilters} className="flex-1 border border-white/10 text-muted hover:text-txt py-2 rounded-lg text-sm transition">Reset</button>
            </div>
          </div>
        </aside>

        <div className="lg:w-3/4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-txt">{filtered.length} Apps Found</h2>
            <div className="relative lg:w-64">
              <input 
                type="text" 
                placeholder="Search apps..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-txt focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 glass rounded-2xl mt-8">
              <p className="text-muted">No apps match your current filters.</p>
              <button onClick={resetFilters} className="text-accent mt-2 hover:underline">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
