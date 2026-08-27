import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/s8logov2_clean.png";

const SORO_EMBED_URL =
  "https://app.trysoro.com/api/embed/f374b416-5193-4d7a-9a7b-3665a1fcfe60";

export default function BlogPage() {
  const [embedUnavailable, setEmbedUnavailable] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const originalDescription = description?.content;

    document.title = "Community Insights & Resources | Social8 Blog";
    if (description) {
      description.content =
        "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.";
    }

    const script = document.createElement("script");
    script.src = SORO_EMBED_URL;
    script.defer = true;
    script.dataset.soroEmbed = "social8";
    script.onerror = () => setEmbedUnavailable(true);
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.title = originalTitle;
      if (description && originalDescription) description.content = originalDescription;
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
            <Link href="/blog" className="text-sm font-medium text-foreground px-2 py-1 rounded-md">Blog</Link>
          </nav>
          <Link href="/create-account">
            <Button size="sm">Create Account</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b bg-gradient-to-br from-primary/5 via-accent/5 to-background py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Social8 Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights and practical ideas for building, engaging and growing thriving communities.
            </p>
          </div>
        </section>
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
      </main>
    </div>
  );
}