interface App {
  id: string;
  license: string;
  features: string[];
}

interface StatsBarProps {
  apps: App[];
}

export function StatsBar({ apps }: StatsBarProps) {
  const stats = [
    { label: "New Apps", value: apps.length.toString() },
    { label: "Free or Open Source", value: apps.filter(a => a.license.includes("Free") || a.license.includes("Open Source")).length.toString() },
    { label: "10+ Platforms", value: "10+" },
    { label: "AI-Powered Tools", value: apps.filter(a => a.features.includes("AI-Powered")).length.toString() },
  ];

  return (
    <section className="border-y border-white/10 bg-white/[0.02]" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
