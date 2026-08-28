import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoPath from "@assets/s8logov2_clean.png";
import mobileAppImage from "@assets/web-mobile-feature.png";
import adminPanelImage from "@assets/admin-panel-feature.png";
import eventsImage from "@assets/events-competitions-feature.png";
import pointsImage from "@assets/points-leaderboards-feature.png";
import marketplaceImage from "@assets/marketplace-feature.png";
import yourCommunityImage from "@assets/your-community-feature.png";
import {
  ArrowRight,
  CheckCircle,
  Coins,
  Globe,
  HeartHandshake,
  Menu,
  Settings,
  Smartphone,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import {
  seoLandingPages,
  type LandingPageIcon,
  type LandingPageImage,
} from "@shared/seo-pages";

const icons: Record<LandingPageIcon, LucideIcon> = {
  coins: Coins,
  globe: Globe,
  "heart-handshake": HeartHandshake,
  settings: Settings,
  smartphone: Smartphone,
  trophy: Trophy,
  users: Users,
};

const images: Record<LandingPageImage, string> = {
  "admin-panel": adminPanelImage,
  "events-competitions": eventsImage,
  marketplace: marketplaceImage,
  "mobile-app": mobileAppImage,
  "points-leaderboards": pointsImage,
  "your-community": yourCommunityImage,
};

function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "/community-platform", label: "Platform" },
    { href: "/sports", label: "Sports" },
    { href: "/charities", label: "Charities" },
    { href: "/membership", label: "Membership" },
    { href: "/rewards", label: "Rewards" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/"><img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" /></Link>
        <nav className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/create-account"><Button size="sm">Create Account</Button></Link>
          <Button
            size="icon"
            variant="outline"
            className="md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav id="landing-mobile-navigation" className="md:hidden border-t bg-background px-4 py-3 grid gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">{link.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default function SeoLandingPage() {
  const [location] = useLocation();
  const page = seoLandingPages[location] || seoLandingPages["/community-platform"];
  const PageIcon = icons[page.icon];

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageSEO({ title: page.metaTitle, description: page.description, url: location, image: images[page.image] });
    const existingSchema = document.getElementById("route-webpage-schema") as HTMLScriptElement | null;
    const schema = existingSchema || document.createElement("script");
    schema.id = "route-webpage-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: `https://social8.app${location}`,
      isPartOf: { "@type": "WebSite", name: "Social8", url: "https://social8.app" },
    });
    if (!existingSchema) document.head.appendChild(schema);
    return () => {
      schema.remove();
      resetPageSEO();
    };
  }, [location, page]);

  return (
    <div className="min-h-screen flex flex-col" data-testid={`page-seo-${location.slice(1).replaceAll("/", "-")}`}>
      <LandingHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                    <PageIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">{page.eyebrow}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">{page.hero}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">{page.intro}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/create-account"><Button size="lg" className="gap-2">Go Live Now <ArrowRight className="w-4 h-4" /></Button></Link>
                  <Link href="/contact"><Button size="lg" variant="outline">Talk to our team</Button></Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-300/25 blur-3xl rounded-full scale-75" />
                <img src={images[page.image]} alt={page.imageAlt} className="relative w-full rounded-2xl border shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build participation</h2>
              <p className="text-lg text-muted-foreground">{page.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {page.benefits.map((benefit, i) => (
                <Card key={i} className="h-full hover-elevate" data-testid={`seo-benefit-${i}`}>
                  <CardContent className="p-5 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {page.points.map((point, i) => (
                <div key={i} className="text-center" data-testid={`seo-point-${i}`}>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{i + 1}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{point.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore more from Social8</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {page.related.map((link) => <Link key={link.href} href={link.href}><Button variant="outline">{link.label} <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>)}
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 p-8 md:p-12 text-white max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-3">Ready to build your community?</h2>
              <p className="text-emerald-50 text-lg mb-6">Launch your Social8 community and start bringing people together.</p>
              <Link href="/create-account"><Button size="lg" variant="secondary">Go Live Now <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}