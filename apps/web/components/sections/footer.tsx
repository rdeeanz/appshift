export function Footer() {
  const columns = [
    { title: "Browse", links: ["New Apps", "Trending", "Popular", "Categories"] },
    { title: "Community", links: ["Submit App", "Discussions", "Contributors", "Blog"] },
    { title: "About", links: ["About AppShift", "Team", "Careers", "Press Kit"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "DMCA"] },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/[0.02]" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="md:w-1/3">
            <a href="/" className="flex items-center gap-2 text-xl font-bold text-txt mb-3">
              <span className="text-accent text-2xl">⬡</span>AppShift
            </a>
            <p className="text-sm text-muted">
              Discover, compare, and share software alternatives. Powered by a global community of developers and enthusiasts.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:w-2/3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-txt mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted hover:text-txt transition">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span>© 2025 AppShift. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-txt transition">Privacy Policy</a>
            <a href="#" className="hover:text-txt transition">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
