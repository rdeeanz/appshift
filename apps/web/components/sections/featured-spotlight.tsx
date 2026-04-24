import { getColor } from "@/lib/utils";

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
  isFeatured: boolean;
}

interface FeaturedSpotlightProps {
  apps: App[];
}

export function FeaturedSpotlight({ apps }: FeaturedSpotlightProps) {
  const featured = apps.find((a) => a.isFeatured) || apps[5] || apps[0];

  if (!featured) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" aria-label="Featured App">
      <article className="glass p-6 md:p-8 relative overflow-hidden card-hover">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col md:flex-row gap-6 relative">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ Editor's Pick — Open Source Design Tool
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: getColor(featured.name) }}>
                {featured.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-txt">{featured.name}</h2>
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">{featured.type}</span>
              </div>
            </div>
            <p className="text-muted mb-4">{featured.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {featured.platforms.map((p) => (
                <span key={p} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-muted">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {featured.features.map((f) => (
                <span key={f} className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-medium">{featured.license}</span>
              {featured.origin && <span className="text-muted text-xs">🌍 {featured.origin}</span>}
              <a href={featured.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-accent hover:bg-accent/80 text-white px-5 py-2 rounded-lg transition font-medium text-sm">
                Explore {featured.name} →
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-accent/10 to-teal/10 border border-white/10 flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 400 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="400" height="30" fill="rgba(255,255,255,0.05)" />
                <circle cx="15" cy="15" r="4" fill="#ef4444" /><circle cx="30" cy="15" r="4" fill="#f59e0b" /><circle cx="45" cy="15" r="4" fill="#22c55e" />
                <text x="200" y="18" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter">{featured.name} — Design Editor</text>
                <rect x="0" y="30" width="60" height="220" fill="rgba(255,255,255,0.03)" />
                <rect x="10" y="45" width="40" height="5" rx="2" fill="rgba(99,102,241,0.4)" />
                <rect x="10" y="58" width="40" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
                <rect x="10" y="71" width="40" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
                <rect x="10" y="84" width="40" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
                <rect x="80" y="50" width="200" height="160" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="4" />
                <rect x="100" y="80" width="80" height="50" rx="6" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
                <text x="140" y="110" textAnchor="middle" fill="#6366f1" fontSize="10" fontFamily="Inter">Button</text>
                <rect x="200" y="70" width="60" height="80" rx="6" fill="rgba(20,184,166,0.15)" stroke="rgba(20,184,166,0.4)" strokeWidth="1" />
                <text x="230" y="115" textAnchor="middle" fill="#14b8a6" fontSize="9" fontFamily="Inter">Card</text>
                <rect x="300" y="50" width="90" height="170" fill="rgba(255,255,255,0.03)" />
                <rect x="310" y="65" width="70" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
                <rect x="310" y="80" width="70" height="20" rx="3" fill="rgba(99,102,241,0.15)" />
                <rect x="310" y="108" width="70" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
                <rect x="310" y="123" width="70" height="20" rx="3" fill="rgba(20,184,166,0.15)" />
                <rect x="310" y="151" width="70" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
