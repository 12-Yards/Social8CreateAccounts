import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Building2, LayoutDashboard, LogIn, ShieldCheck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketingFooter from "@/components/marketing-footer";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import logoPath from "@assets/s8logov2_clean.png";

const VENDOR_PLATFORM_URL = "https://demoplatform.social8.app";
const VENDOR_SIGNUP_URL = `${VENDOR_PLATFORM_URL}/signup?accountType=vendor`;
const VENDOR_SIGNIN_URL = `${VENDOR_PLATFORM_URL}/signin?returnTo=%2Fvendors`;
const VENDOR_DASHBOARD_URL = `${VENDOR_PLATFORM_URL}/vendors`;

export default function VendorsPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Social8 Vendors | Sign Up, Sign In & Manage Your Account",
      description: "Become a Social8 vendor, sign in to your vendor account, or access your dashboard to manage listings and redemptions.",
      url: "/vendors",
    });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-background to-background" data-testid="page-vendors">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 cursor-pointer object-contain" data-testid="img-vendors-logo" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-vendors-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <section className="overflow-hidden rounded-3xl border bg-slate-950 px-6 py-12 text-white shadow-xl md:px-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-sm font-medium text-emerald-300">
                <Store className="h-4 w-4" aria-hidden="true" />
                Social8 vendor platform
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl" data-testid="heading-vendors">
                Turn your products and services into points rewards.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Reach Social8 communities, create marketplace offers and manage member redemptions from one vendor workspace.
              </p>
            </div>
            <a href={VENDOR_DASHBOARD_URL} className="shrink-0">
              <Button size="lg" className="w-full gap-2 bg-emerald-500 text-white hover:bg-emerald-600" data-testid="button-open-vendor-dashboard-hero">
                Open vendor dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2" aria-label="Vendor account access">
          <article className="flex flex-col rounded-3xl border bg-card p-7 shadow-sm md:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <LogIn className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Vendor sign in</h2>
            <p className="mt-3 flex-1 leading-7 text-muted-foreground">
              Sign in to update your vendor profile, manage listings, review redemptions and access your vendor statement.
            </p>
            <a href={VENDOR_SIGNIN_URL} className="mt-7">
              <Button className="w-full gap-2" data-testid="button-vendor-signin">
                Sign in as a vendor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </article>

          <article className="flex flex-col rounded-3xl border bg-card p-7 shadow-sm md:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Become a Social8 vendor</h2>
            <p className="mt-3 flex-1 leading-7 text-muted-foreground">
              Create a vendor account using your verified email address. Once approved, you can publish offers that members redeem with points.
            </p>
            <a href={VENDOR_SIGNUP_URL} className="mt-7">
              <Button variant="outline" className="w-full gap-2" data-testid="button-vendor-signup">
                Create vendor account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border bg-card p-7 shadow-sm md:p-9">
          <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Already have an account?</h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                Go directly to your vendor workspace. If your session has expired, the platform will ask you to sign in again.
              </p>
            </div>
            <a href={VENDOR_DASHBOARD_URL}>
              <Button variant="secondary" className="w-full gap-2 md:w-auto" data-testid="button-open-vendor-dashboard">
                Go to dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <p>
            Signup, sign-in and dashboard access are securely managed on the Social8 platform. Social8 will never place your password or session token in a redirect URL.
          </p>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}