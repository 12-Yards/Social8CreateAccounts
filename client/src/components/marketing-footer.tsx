import { Link } from "wouter";
import logoPath from "@assets/s8logov2_clean.png";
import { Facebook, Instagram } from "lucide-react";

const platformLinks = [
  { href: "/community-platform", label: "Community Platform" },
  { href: "/community-management-software", label: "Community Management Software" },
  { href: "/community-app", label: "Community App" },
  { href: "/rewards", label: "Rewards" },
  { href: "/white-label", label: "White-Label" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
];

const discoverLinks = [
  { href: "/sports", label: "Sports" },
  { href: "/charities", label: "Charities" },
  { href: "/membership", label: "Membership" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQs" },
  { href: "/climate-positive", label: "Climate Positive" },
  { href: "/vendors", label: "Vendors" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block">
        {label}
      </Link>
    </li>
  );
}

export default function MarketingFooter() {
  return (
    <footer
      id="site-footer"
      className="border-t bg-muted/30 py-12"
      data-testid="section-footer"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" data-testid="img-footer-logo" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Social8 is a complete community platform helping clubs, organisations, charities, creators and membership communities connect members, manage activity and grow participation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => <FooterLink key={link.href} {...link} />)}
              <FooterLink href="/contact" label="Integrations & API" />
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-2">
              {discoverLinks.map((link) => <FooterLink key={link.href} {...link} />)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/regional-partner" label="Regional Partner" />
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Social8. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="https://x.com/social8app" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-muted-foreground hover-elevate px-1 py-0.5 rounded" aria-label="Follow Social8 on X">𝕏</a>
            <a href="https://www.instagram.com/social8platform" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover-elevate px-1 py-0.5 rounded" aria-label="Follow Social8 on Instagram"><Instagram className="w-4 h-4" aria-hidden="true" /></a>
            <a href="https://www.facebook.com/profile.php?id=61593719527932" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover-elevate px-1 py-0.5 rounded" aria-label="Follow Social8 on Facebook"><Facebook className="w-4 h-4" aria-hidden="true" /></a>
            <Link href="/privacy" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded">Terms of Service</Link>
            <Link href="/delete-account" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded">Delete Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}