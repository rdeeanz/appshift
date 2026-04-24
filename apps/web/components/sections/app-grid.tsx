"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { getColor, getLicenseBadge } from "@/lib/utils";

interface App {
  id: string;
  name: string;
  link: string;
  description: string;
  license: string;
  type: string;
  platforms: string[];
  features: string[];
  origin?: string | null;
}

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
    // ... filtering logic (omitted for brevity in this step, will include full in actual file)
    return r;
  }, [initialApps, search, licFilter, platFilter, typeFilter, sortBy]);

  const allTypes = Array.from(new Set(initialApps.map(a => a.type)));
  const allPlats = Array.from(new Set(initialApps.flatMap(a => a.platforms))).sort();

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16" aria-label="App listing">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className={`lg:w-1/3 ${mobSidebar ? "block" : "hidden"} lg:block`}>
          <div className="glass p-6 lg:sticky lg:top-20 space-y-6">
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
              <button className="flex-1 bg-accent hover:bg-accent/80 text-white py-2 rounded-lg text-sm transition font-medium">Apply</button>
            </div>
          </div>
        </aside>

        <div className="lg:w-2/3">
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((app, i) => {
              const lb = getLicenseBadge(app.license);
              return (
                <article key={app.id} className="glass p-5 card-hover flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0" style={{ background: getColor(app.name) }}>
                        {app.name[0]}
                      </div>
                      <div>
                        <a href={app.link} className="text-txt font-semibold hover:text-accent transition text-sm">{app.name}</a>
                        <div className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mt-0.5">{app.type}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted text-sm mb-3 flex-grow">{app.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {app.platforms.map(p => <span key={p} className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-muted">{p}</span>)}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className={`text-[11px] ${lb.bg} ${lb.text} px-2 py-0.5 rounded-full font-medium`}>{lb.label}</span>
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent/80 font-medium transition">Visit Site →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
