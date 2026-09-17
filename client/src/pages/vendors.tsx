import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Handshake,
  LayoutDashboard,
  LogIn,
  Menu,
  PackageCheck,
  Store,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import MarketingFooter from "@/components/marketing-footer";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import logoPath from "@assets/s8logov2_clean.png";

const VENDOR_PLATFORM_URL = "https://demoplatform.social8.app";

type VendorModal = "signin" | "signup" | "dashboard";

const modalDetails: Record<VendorModal, {
  title: string;
  description: string;
  path: string;
}> = {
  signin: {
    title: "Vendor Sign In",
    description: "Sign in to manage your vendor account and offers.",
    path: "/vendor-portal?view=signin&embed=1",
  },
  signup: {
    title: "Become a Social8 Vendor",
    description: "Create your vendor account and start offering rewards to members.",
    path: "/vendor-portal?view=signup&embed=1",
  },
  dashboard: {
    title: "Vendor Dashboard",
    description: "Manage your profile, listings and member redemptions.",
    path: "/vendor-portal?view=dashboard&embed=1",
  },
};

function VendorPlatformModal({
  modal,
  onClose,
}: {
  modal: VendorModal | null;
  onClose: () => void;
}) {
  const details = modal ? modalDetails[modal] : null;

  return (
    <Dialog open={Boolean(modal)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="flex h-screen min-h-0 w-screen max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        data-testid="dialog-vendor-platform"
      >
        {details && (
          <>
            <DialogTitle className="sr-only">{details.title}</DialogTitle>
            <DialogDescription className="sr-only">{details.description}</DialogDescription>
            <iframe
              key={details.path}
              src={`${VENDOR_PLATFORM_URL}${details.path}`}
              title={details.title}
              className="min-h-0 w-full flex-1 border-0 bg-background"
              allow="storage-access; clipboard-read; clipboard-write"
              data-testid={`iframe-vendor-${modal}`}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function VendorsPage() {
  const [activeModal, setActiveModal] = useState<VendorModal | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    updatePageSEO({
      title: "Social8 Vendors | Turn Your Products Into Points Rewards",
      description: "Become a Social8 vendor and put your products or services in front of engaged communities as points-based rewards.",
      url: "/vendors",
    });
    return () => resetPageSEO();
  }, []);

  const openModal = (modal: VendorModal) => setActiveModal(modal);

  return (
    <div className="min-h-screen bg-background" data-testid="page-vendors">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 cursor-pointer object-contain" data-testid="img-vendors-logo" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex" data-testid="nav-main">
            <a href="/#vision" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-vision">Our Vision</a>
            <a href="/#features" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-features">Features</a>
            <a href="/#climate-positive" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-climate-positive">Climate Positive</a>
            <a href="/#pricing" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-pricing">Pricing</a>
            <a href="/#faq" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-faq">FAQs</a>
            <Link href="/resources" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-resources">Resources</Link>
            <Link href="/vendors" className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover-elevate" data-testid="link-vendors">Vendors</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/create-account">
              <Button size="sm" data-testid="button-create-account">Create Account</Button>
            </Link>
            <Button
              size="icon"
              variant="outline"
              className="md:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="vendors-mobile-navigation"
              data-testid="button-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav id="vendors-mobile-navigation" className="grid gap-1 border-t bg-background px-4 py-3 md:hidden" data-testid="nav-mobile">
            <a href="/#vision" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Our Vision</a>
            <a href="/#features" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Features</a>
            <a href="/#climate-positive" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Climate Positive</a>
            <a href="/#pricing" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Pricing</a>
            <a href="/#faq" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">FAQs</a>
            <Link href="/resources" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Resources</Link>
            <Link href="/vendors" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Vendors</Link>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 py-16 text-white lg:py-24" data-testid="section-vendor-hero">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />
          <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
                <Store className="h-4 w-4" />
                The Social8 Vendor Network
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" data-testid="heading-vendors">
                Get paid in crypto for the products and services you offer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-50/80">
                Members redeem your offers using Social8 points. Every point you receive is converted into cryptocurrency, which you can convert back into pounds.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-emerald-900 hover:bg-emerald-50"
                  onClick={() => openModal("signup")}
                  data-testid="button-vendor-sign-up"
                >
                  Become a Vendor
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-200/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => openModal("signin")}
                  data-testid="button-vendor-sign-in"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Vendor Sign In
                </Button>
              </div>
            </div>

            <Card className="border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
                  <Coins className="h-6 w-6" />
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">How vendor payments work</p>
                <h2 className="mt-3 text-2xl font-semibold">Your Social8 points become crypto you can convert into pounds.</h2>
                <ul className="mt-6 space-y-4 text-sm text-emerald-50/85">
                  {[
                    "Members redeem your offers with Social8 points",
                    "The points you receive are converted into cryptocurrency",
                    "Convert your crypto balance back into pounds",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:py-24" data-testid="section-vendor-benefits">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Why become a vendor?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A simple way to connect value with participation.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Social8 communities reward the actions that keep people involved. Your products and services can become part of that experience — and you get paid for every redemption.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Reach active communities", text: "Connect your brand with members who already value participation, discovery and rewards." },
              { icon: Handshake, title: "Build meaningful partnerships", text: "Offer something useful to communities while creating a new channel for your business." },
              { icon: PackageCheck, title: "Manage it in one place", text: "Keep your profile and listings current, then manage member redemptions through your workspace." },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title} className="border-border/70 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30 py-14" data-testid="section-vendor-actions">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight">Already part of the network?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Sign in to your vendor account or open your existing workspace. New to Social8? Create your vendor account to get started.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="gap-2" onClick={() => openModal("signin")} data-testid="button-vendor-action-sign-in">
                  <LogIn className="h-4 w-4" />
                  Vendor Sign In
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => openModal("dashboard")} data-testid="button-vendor-dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Vendor Dashboard
                </Button>
                <Button className="gap-2" onClick={() => openModal("signup")} data-testid="button-vendor-action-sign-up">
                  Become a Vendor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
      <VendorPlatformModal modal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}