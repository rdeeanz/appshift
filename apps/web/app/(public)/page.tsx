import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeaturedSpotlight } from "@/components/sections/featured-spotlight";
import { RecentApps } from "@/components/sections/recent-apps";
import { BrowseCategories } from "@/components/sections/browse-categories";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";
import { getPublicContent } from "@/lib/public-content";

export default async function NewAppsPage() {
  const { apps: allApps, categories, settings } = await getPublicContent();

  const recentApps = allApps.slice(0, 6);

  return (
    <main className="min-h-screen bg-page font-sans">
      <Navbar />
      <Hero settings={settings} />
      <StatsBar apps={allApps} />
      <FeaturedSpotlight apps={allApps} />
      <RecentApps apps={recentApps} />
      <BrowseCategories categories={categories} />
      <Newsletter settings={settings} />
      <Footer />
    </main>
  );
}
