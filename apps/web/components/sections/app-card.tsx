import { getColor, getLicenseBadge } from "@/lib/utils";

export interface App {
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

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const lb = getLicenseBadge(app.license);
  return (
    <article className="glass p-5 card-hover flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0" style={{ background: getColor(app.name) }}>
            {app.name[0]}
          </div>
          <div>
            <a href={app.link} className="text-txt font-semibold hover:text-accent transition text-sm line-clamp-1">{app.name}</a>
            <div className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mt-0.5">{app.type}</div>
          </div>
        </div>
      </div>
      <p className="text-muted text-sm mb-3 flex-grow line-clamp-3">{app.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {app.platforms.map(p => <span key={p} className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-muted">{p}</span>)}
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <span className={`text-[11px] ${lb.bg} ${lb.text} px-2 py-0.5 rounded-full font-medium`}>{lb.label}</span>
        <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent/80 font-medium transition">Visit Site →</a>
      </div>
    </article>
  );
}
