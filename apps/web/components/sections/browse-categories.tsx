interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface BrowseCategoriesProps {
  categories: Category[];
}

export function BrowseCategories({ categories }: BrowseCategoriesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16" aria-label="Browse by category">
      <h2 className="text-2xl font-bold text-txt mb-6 text-center">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <a key={c.id} href="#" className="glass p-5 text-center card-hover group">
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-sm font-semibold text-txt group-hover:text-accent transition">{c.name}</div>
            <div className="text-xs text-muted mt-1">{c.count} apps</div>
          </a>
        ))}
      </div>
    </section>
  );
}
