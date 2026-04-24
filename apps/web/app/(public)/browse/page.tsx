import { Navbar } from "@/components/sections/navbar";
import { AppGrid } from "@/components/sections/app-grid";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";
import { getPublicContent } from "@/lib/public-content";

export default async function BrowsePage() {
  const { apps, settings } = await getPublicContent();

  return (
    <main className="min-h-screen bg-page font-sans">
      <Navbar />
      <div className="pt-24 pb-8 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-txt tracking-tight">Directory</h1>
        <p className="text-muted mt-2 text-lg">Explore our full catalog of software and tools.</p>
      </div>
      <AppGrid initialApps={apps} />
      <Newsletter settings={settings} />
      <Footer />
    </main>
  );
}
