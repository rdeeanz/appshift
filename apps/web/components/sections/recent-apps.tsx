import { AppCard, type App } from "./app-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RecentAppsProps {
  apps: App[];
}

export function RecentApps({ apps }: RecentAppsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16" aria-label="Recent apps">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-txt">Recently Added</h2>
          <p className="text-muted mt-1">Check out the latest tools discovered by our community.</p>
        </div>
        <Link 
          href="/browse" 
          className="hidden sm:flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition group"
        >
          View All Apps
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Link 
          href="/browse" 
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          View All Apps
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="mt-12 text-center hidden sm:block">
        <Link 
          href="/browse" 
          className="inline-flex items-center gap-2 text-muted hover:text-txt transition group"
        >
          Browse all apps in our directory
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
