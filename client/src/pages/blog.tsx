import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/s8logov2_clean.png";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import { Menu, X } from "lucide-react";
import MarketingFooter from "@/components/marketing-footer";

const SORO_EMBED_URL =
  "https://app.trysoro.com/api/embed/f374b416-5193-4d7a-9a7b-3665a1fcfe60";

function LaunchCommunityCTA() {
  return (
    <section className="py-6 lg:py-8" data-testid="section-launch-cta-resources">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-shrink-0 bg-white/95 rounded-2xl p-6 shadow-lg">
              <img src={logoPath} alt="Social8" className="w-48 md:w-56 lg:w-64 object-contain" data-testid="img-resources-launch-cta-logo" />
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-center lg:text-left" data-testid="heading-resources-launch-cta">
                Launch your online community
              </h2>
              <p className="text-white/90 text-lg mb-6 text-center lg:text-left" data-testid="text-resources-launch-cta-subtext">
                Create your account and your community platform can be live in less than an hour.
              </p>
              <Link href="/create-account">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg" data-testid="button-resources-create-account-cta">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const [embedUnavailable, setEmbedUnavailable] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    updatePageSEO({
      title: "Resources & Community Insights | Social8",
      description: "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.",
      url: "/resources",
    });

    const script = document.createElement("script");
    script.src = SORO_EMBED_URL;
    script.defer = true;
    script.dataset.soroEmbed = "social8";
    script.onerror = () => setEmbedUnavailable(true);
    document.body.appendChild(script);

    return () => {
      script.remove();
      resetPageSEO();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/">
            <img
              src={logoPath}
              alt="Social8 Logo"
              className="h-10 object-contain"
              data-testid="img-logo"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6" data-testid="nav-main">
            <a href="/#vision" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">Our Vision</a>
            <a href="/#features" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">Features</a>
            <a href="/#climate-positive" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">Climate Positive</a>
            <a href="/#pricing" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">Pricing</a>
            <a href="/#faq" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">FAQs</a>
            <Link href="/resources" className="text-sm font-medium text-foreground px-2 py-1 rounded-md">Resources</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/create-account">
              <Button size="sm">Create Account</Button>
            </Link>
            <Button
              size="icon"
              variant="outline"
              className="md:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="resources-mobile-navigation"
              data-testid="button-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav id="resources-mobile-navigation" className="md:hidden border-t bg-background px-4 py-3 grid gap-1" data-testid="nav-mobile">
            <a href="/#vision" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Our Vision</a>
            <a href="/#features" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Features</a>
            <a href="/#pricing" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Pricing</a>
            <Link href="/resources" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">Resources</Link>
          </nav>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-12 lg:py-16">
          {embedUnavailable && (
            <div className="max-w-2xl mx-auto rounded-xl border bg-muted/30 p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Blog coming soon</h2>
              <p className="text-muted-foreground">
                We're preparing fresh insights and resources for community owners.
              </p>
            </div>
          )}
          <div id="soro-blog" data-testid="soro-blog" />
        </section>
        <LaunchCommunityCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}