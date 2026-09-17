import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketingFooter from "@/components/marketing-footer";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import logoPath from "@assets/s8logov2_clean.png";

const VENDOR_PLATFORM_URL = "https://demoplatform.social8.app/vendors";

export default function VendorsPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Social8 Vendors | Vendor Workspace",
      description: "Access the Social8 vendor workspace to manage your profile, offers, listings and member redemptions.",
      url: "/vendors",
    });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-vendors">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link href="/">
            <img src={logoPath} alt="Social8 Logo" className="h-10 cursor-pointer object-contain" data-testid="img-vendors-logo" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">Vendor workspace</span>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-vendors-back">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3 px-1">
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl" data-testid="heading-vendors">Social8 Vendor Workspace</h1>
            <p className="text-sm text-muted-foreground">Manage your vendor account, offers and redemptions.</p>
          </div>
          <a href={VENDOR_PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button variant="outline" size="sm" className="hidden gap-2 sm:inline-flex" data-testid="button-open-vendor-platform">
              Open separately
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm" data-testid="vendor-platform-frame">
          <iframe
            src={VENDOR_PLATFORM_URL}
            title="Social8 Vendor Workspace"
            className="block h-[calc(100vh-9rem)] min-h-[780px] w-full border-0"
            allow="clipboard-read; clipboard-write"
            data-testid="iframe-vendor-platform"
          />
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}