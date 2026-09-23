import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/s8logov2_clean.png";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import MarketingFooter from "@/components/marketing-footer";

type NewsArticle = {
  id: number;
  sourceId: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  imageData: string | null;
  imageMimeType: string | null;
  publishedAt: string;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function articleImage(article: NewsArticle): string | undefined {
  if (!article.imageData || !article.imageMimeType) return undefined;
  return `data:${article.imageMimeType};base64,${article.imageData}`;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    updatePageSEO({
      title: "Resources & Community Insights | Social8",
      description: "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.",
      url: "/resources",
    });

    const loadArticles = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) throw new Error("Failed to load news");
        setArticles(await response.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadArticles();
    return () => resetPageSEO();
  }, []);

  useEffect(() => {
    const openFromUrl = async () => {
      const slug = new URLSearchParams(window.location.search).get("post");
      if (!slug) {
        setSelectedArticle(null);
        return;
      }

      try {
        const response = await fetch(`/api/news/${encodeURIComponent(slug)}`);
        if (!response.ok) throw new Error("Article not found");
        setSelectedArticle(await response.json());
      } catch {
        setSelectedArticle(null);
      }
    };

    void openFromUrl();
    const handlePopState = () => void openFromUrl();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openArticle = (slug: string) => {
    window.history.pushState({}, "", `/resources?post=${encodeURIComponent(slug)}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const closeArticle = () => {
    window.history.pushState({}, "", "/resources");
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" data-testid="img-logo" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex" data-testid="nav-main">
            <a href="/#vision" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">Our Vision</a>
            <a href="/#features" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">Features</a>
            <a href="/#climate-positive" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">Climate Positive</a>
            <a href="/#pricing" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">Pricing</a>
            <a href="/#faq" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">FAQs</a>
            <Link href="/resources" className="rounded-md px-2 py-1 text-sm font-medium text-foreground">Resources</Link>
            <Link href="/vendors" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate">Vendors</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/create-account"><Button size="sm">Create Account</Button></Link>
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
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav id="resources-mobile-navigation" className="grid gap-1 border-t bg-background px-4 py-3 md:hidden" data-testid="nav-mobile">
            <a href="/#vision" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Our Vision</a>
            <a href="/#features" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Features</a>
            <a href="/#pricing" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Pricing</a>
            <Link href="/resources" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">Resources</Link>
            <Link href="/vendors" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Vendors</Link>
          </nav>
        )}
      </header>

      <main>
        {selectedArticle ? (
          <article className="container mx-auto max-w-4xl px-4 py-12 lg:py-16">
            <Button variant="ghost" className="mb-8 gap-2" onClick={closeArticle}>
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Button>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{formatDate(selectedArticle.publishedAt)}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{selectedArticle.title}</h1>
            {articleImage(selectedArticle) && (
              <img src={articleImage(selectedArticle)} alt="" className="mt-8 max-h-[32rem] w-full rounded-2xl object-cover" />
            )}
            <div
              className="prose prose-lg mt-10 max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content || `<p>${selectedArticle.excerpt}</p>` }}
            />
          </article>
        ) : (
          <section className="container mx-auto px-4 py-12 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Social8 resources</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Ideas for stronger communities.</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Practical news and insights for community owners, clubs and member-led organisations.</p>
            </div>
            {loading ? (
              <p className="mx-auto mt-12 max-w-xl text-center text-muted-foreground">Loading the latest resources…</p>
            ) : error ? (
              <p className="mx-auto mt-12 max-w-xl text-center text-muted-foreground">Resources are temporarily unavailable. Please try again shortly.</p>
            ) : articles.length === 0 ? (
              <p className="mx-auto mt-12 max-w-xl text-center text-muted-foreground">New resources are being prepared.</p>
            ) : (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <button
                    key={article.sourceId}
                    type="button"
                    className="group overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    onClick={() => openArticle(article.slug)}
                    data-testid={`card-news-${article.slug}`}
                  >
                    {articleImage(article) && <img src={articleImage(article)} alt="" className="aspect-[16/9] w-full object-cover" />}
                    <span className="block p-6">
                      <span className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</span>
                      <span className="mt-2 block text-xl font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300">{article.title}</span>
                      <span className="mt-3 block leading-relaxed text-muted-foreground">{article.excerpt}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
      <LaunchCommunityCTA />
      <MarketingFooter />
    </div>
  );
}

function LaunchCommunityCTA() {
  return (
    <section className="py-6 lg:py-8" data-testid="section-launch-cta-resources">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 p-8 md:p-12 lg:p-16">
          <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="rounded-2xl bg-white/95 p-6 shadow-lg">
              <img src={logoPath} alt="Social8" className="w-48 object-contain md:w-56 lg:w-64" data-testid="img-resources-launch-cta-logo" />
            </div>
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h2 className="mb-3 text-center text-3xl font-bold text-white md:text-4xl lg:text-left lg:text-5xl" data-testid="heading-resources-launch-cta">Launch your online community</h2>
              <p className="mb-6 text-center text-lg text-white/90 lg:text-left" data-testid="text-resources-launch-cta-subtext">Create your account and your community platform can be live in less than an hour.</p>
              <Link href="/create-account"><Button size="lg" className="bg-white text-emerald-700 shadow-lg hover:bg-white/90" data-testid="button-resources-create-account-cta">Create Account</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}