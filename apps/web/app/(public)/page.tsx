import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeaturedSpotlight } from "@/components/sections/featured-spotlight";
import { AppGrid } from "@/components/sections/app-grid";
import { BrowseCategories } from "@/components/sections/browse-categories";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";
import { prisma } from "@/lib/db";

export default async function NewAppsPage() {
  // Fetch initial data from DB (Server Component)
  const apps = await prisma.app.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  const settings = await prisma.siteSettings.findFirst() || {
    heroTitle: "Discover Newly Submitted Apps",
    heroSubtitle: "Fresh software discovered by the AppShift community. Browse, compare, and find your next favorite tool.",
    heroBadge: "19 New Apps This Week",
  };

  return (
    <main className="min-h-screen bg-page font-sans">
      <Navbar />
      <Hero settings={settings} />
      <StatsBar apps={apps} />
      <FeaturedSpotlight apps={apps} />
      <AppGrid initialApps={apps} />
      <BrowseCategories categories={categories} />
      <Newsletter settings={settings} />
      <Footer />
    </main>
  );
}
