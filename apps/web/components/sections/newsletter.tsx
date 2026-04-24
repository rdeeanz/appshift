"use client";

interface NewsletterProps {
  settings: {
    newsletterTitle: string;
    newsletterDesc: string;
  };
}

export function Newsletter({ settings }: NewsletterProps) {
  return (
    <section className="relative overflow-hidden" aria-label="Newsletter signup">
      <div className="absolute inset-0 anim-grad opacity-5"></div>
      <div className="max-w-3xl mx-auto px-4 py-16 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-txt mb-4">{settings.newsletterTitle}</h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">{settings.newsletterDesc}</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-txt placeholder-muted focus:outline-none focus:border-accent transition" 
            aria-label="Email address"
          />
          <button type="submit" className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p className="text-xs text-muted">Join the AppShift community — no spam, unsubscribe anytime.</p>
      </div>
    </section>
  );
}
