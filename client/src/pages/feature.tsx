import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/s8logov2_clean.png";
import groupsCommunitiesImage from "@/assets/images/feature-groups-communities.png";
import memberCommunicationImage from "@/assets/images/feature-member-communication.png";
import eventsCompetitionsImage from "@/assets/images/feature-events-competitions.png";
import contentPublishingImage from "@/assets/images/feature-content-publishing.png";
import analyticsReportingImage from "@/assets/images/feature-analytics-reporting.png";
import mobileAppImage from "@assets/web-mobile-feature.png";
import zeroFrictionSignupImage from "@assets/zero-friction-signup.png";
import adminPanelImage from "@assets/admin-panel-feature.png";
import eventsFeatureImage from "@assets/events-competitions-feature.png";
import communityContentImage from "@assets/community-content-feature.png";
import yourCommunityImage from "@assets/your-community-feature.png";
import marketplaceImage from "@assets/marketplace-feature.png";
import fullySupportedImage from "@assets/fully-supported-feature.png";
import { Link, useParams } from "wouter";
import { 
  Users, 
  Calendar, 
  Globe, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Zap,
  Settings,
  HelpCircle,
  Trophy,
  Gift,
  Gavel,
  CreditCard,
  Store,
  Smartphone,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";

const featuresData = {
  "multi-tenancy": {
    icon: Globe,
    title: "Your Community",
    subtitle: "One platform, unlimited communities",
    description: "Every community runs as its own fully branded, isolated environment with its own domain, members, content and data.",
    heroDescription: "Every community operates as a completely isolated, branded environment with its own members, content, data and administration — all while benefiting from a shared, secure and highly scalable infrastructure.",
    benefits: [
      "Isolated data per community with its own domain or subdomain",
      "Per-tenant branding applied live: platform name, logo, colours, hero content and legal pages",
      "Per-tenant customisable email templates for every automated email",
      "Automated onboarding provisions a branded community in seconds",
      "Per-tenant pricing with community-specific subscription plans and paid events",
      "A single mobile app where users can join and access multiple platforms"
    ],
    useCases: [
      "Launch a fully branded community under your own domain",
      "Run multiple communities from one shared infrastructure",
      "Customise every email your platform sends to members",
      "Oversee all tenants from super-admin tooling"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: yourCommunityImage
  },
  "zero-friction-signup": {
    icon: Zap,
    title: "Zero-Friction Signup",
    subtitle: "Launch in minutes, join in seconds",
    description: "Communities launch in minutes and members join in seconds — simple email signup with one-time-code verification or single sign-on.",
    heroDescription: "New communities can launch within minutes, while members join in seconds through a simple sign-up process. Automated provisioning keeps onboarding costs low and enables rapid, scalable growth.",
    benefits: [
      "Simple email signup with one-time-code verification",
      "Single sign-on support",
      "No approval queues, invitations or paywalls required to get started",
      "Open by default, with optional premium tiers",
      "Streamlined organisation signup with optional owner-approval workflow",
      "New communities launch with sensible defaults, usable from day one"
    ],
    useCases: [
      "Members join your community in under a minute",
      "Clubs and venues register with their own approval flow",
      "Launch with ready-made branding, categories and homepage content",
      "Grow rapidly without onboarding overhead"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: zeroFrictionSignupImage
  },
  "self-management": {
    icon: Settings,
    title: "Fully Self-Managed",
    subtitle: "Complete control, no technical skills needed",
    description: "Run your entire community through an intuitive admin panel — branding, content, members, events and monetisation.",
    heroDescription: "Community owners run their entire instance through a comprehensive admin panel — no technical skills and no vendor involvement needed. Everything from branding to monetisation is in your hands.",
    benefits: [
      "Content control: articles, podcasts, polls, reviews, events and homepage sections",
      "Member administration: roles, granular permissions, subscriptions and blocking",
      "Site control: section visibility, naming, branding, legal pages and email templates",
      "Approval workflows for member reviews, event suggestions and organisation accounts",
      "Modular by design: switch engagement modules on or off per community",
      "No vendor involvement required — ever"
    ],
    useCases: [
      "Rebrand your entire platform in minutes",
      "Moderate member content with approval workflows",
      "Enable quizzes, auctions and reward points when you're ready",
      "Delegate administration with granular permissions"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: adminPanelImage
  },
  "community-content": {
    icon: FileText,
    title: "Community & Content",
    subtitle: "Rich content that keeps members coming back",
    description: "Editorial articles, podcasts, member reviews, polls, newsletters and a social feed with posts, comments, replies and reactions.",
    heroDescription: "Build a rich content hub for your community. From editorial articles and podcasts to polls, reviews and a full social feed, give members reasons to return every day.",
    benefits: [
      "Editorial articles with categories, rich text and embedded video streaming",
      "Podcast listings with in-platform media playback",
      "Member reviews with owner approval workflow",
      "Community polls with member voting",
      "Social feed with posts, comments, replies and reactions",
      "Public and private groups, plus newsletter subscriptions"
    ],
    useCases: [
      "Publish club news and feature articles",
      "Host your community podcast in-platform",
      "Run member polls to guide decisions",
      "Build discussion around a lively social feed"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: communityContentImage
  },
  "events-competitions": {
    icon: Calendar,
    title: "Events & Competitions",
    subtitle: "From casual meet-ups to knockout tournaments",
    description: "Event listings with attendance tracking, member-suggested events, and a competition engine with individual, team and knockout formats.",
    heroDescription: "A complete events and competition engine. Rich event listings with attendance tracking and a personal calendar, plus individual, team and knockout competitions with live leaderboards and mobile results entry.",
    benefits: [
      "Event listings with categories, rich media and attendance tracking",
      "Personal \"My Calendar\" view for every member",
      "Member-suggested events with owner approval",
      "Individual, team and knockout competition formats with live leaderboards",
      "Live results entered by participants from their phones, with real-time verification",
      "Paid event and competition entries via Stripe or cryptocurrency"
    ],
    useCases: [
      "Monthly competitions with live leaderboards",
      "Knockout tournaments with team assignment and guest participants",
      "Member-suggested social events",
      "Paid entry events with automated payment verification"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: eventsFeatureImage
  },
  "live-quizzes": {
    icon: HelpCircle,
    title: "Live Quizzes",
    subtitle: "Bring your whole community online together",
    description: "Scheduled live quiz events where everyone plays the same questions at the same time, with rich formats and speed bonuses.",
    heroDescription: "Owner-scheduled live quiz events: members pre-register, then everyone plays the same questions at the same time, synchronised by the server — a shared appointment-to-play moment that brings the whole community online together.",
    benefits: [
      "Rich question formats: multiple choice, true/false, put-in-order and guess-who photo rounds",
      "Progressive photo reveal — images uncovered tile by tile as the clock runs",
      "Tiered speed bonuses for the three fastest correct answers on every question",
      "Instant feedback after every question and a live post-game leaderboard",
      "Personal answer-by-answer review showing exactly where points were won or lost",
      "Fully self-service: build, schedule and price question sets in the admin panel"
    ],
    useCases: [
      "Weekly community quiz nights",
      "Paid entry quizzes as a revenue stream",
      "Themed photo-reveal rounds",
      "Friendly rivalry driven by speed bonuses"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: null as string | null
  },
  "points-leaderboards": {
    icon: Trophy,
    title: "Earn Points & Leaderboards",
    subtitle: "Reward participation, fuel engagement",
    description: "A platform-wide points economy rewarding participation, with owner-configurable earning rules and monthly leaderboards.",
    heroDescription: "A platform-wide points economy: members earn points for taking part — voting in polls, having reviews published, playing quizzes and joining community activities. The more members engage, the more they earn.",
    benefits: [
      "Points earned for polls, reviews, quizzes and community participation",
      "Owner-configurable earning rules per community",
      "Monthly leaderboards that reset the race and keep newer members competitive",
      "Live points balance visible in the site header",
      "Full personal statement of every point earned and spent",
      "Auditable, append-only ledger — every award is tamper-resistant"
    ],
    useCases: [
      "Reward your most active members automatically",
      "Monthly leaderboard competitions",
      "Configure which activities earn points and how many",
      "Give members a trustworthy, transparent points balance"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: analyticsReportingImage
  },
  "redeem-points": {
    icon: Gift,
    title: "Redeem Points",
    subtitle: "Turn engagement into real rewards",
    description: "Members redeem earned points for instant digital rewards from a fully customisable catalogue.",
    heroDescription: "Members earn points through active participation and redeem them directly within the app for immediate rewards — no physical fulfilment, postage or administration costs.",
    benefits: [
      "Members earn points through active platform participation",
      "Fully customisable rewards catalogue controlled by administrators",
      "Environmental initiatives, digital vouchers, local partner offers or bespoke benefits",
      "Instant digital redemption within the app",
      "No physical fulfilment, postage or administration costs",
      "Gamified rewards drive retention and long-term loyalty"
    ],
    useCases: [
      "Offer digital vouchers as engagement rewards",
      "Partner with local businesses for member offers",
      "Support environmental initiatives through redemptions",
      "Boost event participation with reward incentives"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: contentPublishingImage
  },
  "prize-auctions": {
    icon: Gavel,
    title: "Prize Auctions",
    subtitle: "Make points genuinely worth earning",
    description: "Members spend earned points bidding on real prizes in owner-run auctions with live countdowns and escrow-held bids.",
    heroDescription: "Members spend their earned points bidding on real prizes in owner-run auctions — closing the engagement loop by making points genuinely worth earning. The currency is participation itself.",
    benefits: [
      "Multiple concurrent auctions with independent start and end times",
      "Multi-image prize galleries and live countdowns",
      "Automatic bid increments that scale with the bid level",
      "Points held in escrow while a bid is live, refunded instantly if outbid",
      "In-app notifications for outbid and auction-won moments",
      "Simple claim workflow for winners and fulfilment tracking for owners"
    ],
    useCases: [
      "Auction donated prizes without cash transactions",
      "Convert engagement into tangible rewards",
      "Run seasonal prize auctions to boost activity",
      "Track prize fulfilment through the claim workflow"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: eventsCompetitionsImage
  },
  "members-networking": {
    icon: Users,
    title: "Members & Networking",
    subtitle: "Connect members and organisations",
    description: "Member profiles with customisable fields, advanced search, connection requests, organisation profiles and member wallets.",
    heroDescription: "Build a genuine network within your community. Rich member profiles, advanced search, connections, and organisation accounts that can publish exclusive offers to members.",
    benefits: [
      "Member profiles with photos and fully customisable profile fields",
      "Member search with advanced filters across members and organisations",
      "Connection requests, acceptance flow and a connections hub",
      "Administration accounts with a dedicated management dashboard",
      "Organisation profiles that publish exclusive offers to members",
      "Member and organisation wallets for points and cryptocurrency"
    ],
    useCases: [
      "Members find and connect with like-minded people",
      "Clubs advertise exclusive offers — like discounted tee times — to the community",
      "Define custom profile fields per community",
      "Manage points and payments through built-in wallets"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: memberCommunicationImage
  },
  "monetisation": {
    icon: CreditCard,
    title: "Monetisation",
    subtitle: "Multiple revenue streams, one platform",
    description: "Premium subscriptions, paid events, a cross-community marketplace, advertising revenue share and paid polls.",
    heroDescription: "Turn your community into a sustainable business. From premium memberships and paid events to a cross-community marketplace and advertising revenue share, Social8 gives you multiple ways to generate income.",
    benefits: [
      "Stripe and cryptocurrency payments supported",
      "Premium community membership subscriptions",
      "Central marketplace accessible across participating communities",
      "Paid event and competition entries with automated payment verification",
      "Advertising revenue shared between Social8 and communities",
      "Paid polls providing aggregated demographic insights"
    ],
    useCases: [
      "Launch premium membership tiers",
      "Charge for event and competition entries",
      "Sell through the cross-community marketplace",
      "Share in advertising revenue"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: contentPublishingImage
  },
  "fully-supported": {
    icon: HeartHandshake,
    title: "Fully Supported & Maintained",
    subtitle: "Peace of mind, with zero technical concerns",
    description: "Social8 fully supports and maintains the platform — hosting, updates, security and backups all handled for you.",
    heroDescription: "You focus on your community — we take care of everything else. The entire platform is fully supported and maintained by Social8, so there's nothing to install, patch, host or back up. Your community runs on always-up-to-date, secure infrastructure with expert help whenever you need it.",
    benefits: [
      "Hosting, maintenance and updates handled entirely by Social8",
      "Security patches and monitoring applied automatically",
      "Automatic backups keep your community data safe",
      "New features and improvements delivered continuously",
      "Expert support team on hand when you need help",
      "No technical skills or IT resources required"
    ],
    useCases: [
      "Run a community without any technical staff",
      "Stay secure and up to date automatically",
      "Get expert help whenever questions arise",
      "Focus your time on members, not infrastructure"
    ],
    colorClass: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    image: fullySupportedImage
  },
  "website-mobile-app": {
    icon: Smartphone,
    title: "Web and Mobile App",
    subtitle: "A branded web presence and mobile app access from day one",
    description: "Every community gets its own branded website — and members automatically get access through the Social8 mobile app.",
    heroDescription: "When you sign up, your community instantly gets its own fully branded website with its own web address. And there's nothing extra to build — your community is automatically available in the Social8 mobile app, so members can engage from anywhere on iOS and Android.",
    benefits: [
      "Your own branded community website, live from day one",
      "Your own web address for your community",
      "Automatic inclusion in the Social8 mobile app",
      "Members engage on web, iOS and Android from a single platform",
      "No app store submissions or technical setup required",
      "Consistent branding across web and mobile"
    ],
    useCases: [
      "Launch a professional web presence in minutes",
      "Give members a mobile app experience without building one",
      "Reach members wherever they are — web or mobile",
      "Keep your brand front and centre on every device"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: mobileAppImage
  },
  "marketplace": {
    icon: Store,
    title: "Marketplace",
    subtitle: "Buy and sell with points, currency or crypto",
    description: "A cross-community marketplace where members buy and sell using points, traditional currency or cryptocurrency.",
    heroDescription: "A central marketplace accessible across participating communities. Members can browse and buy — paying with earned points, traditional currency or cryptocurrency — turning community engagement into real-world value.",
    benefits: [
      "Central marketplace shared across participating communities",
      "Pay with points, traditional currency or cryptocurrency",
      "Members spend earned points on real products and services",
      "Community owners open new revenue streams",
      "Secure payments through Stripe and crypto integrations",
      "Listings managed through the community admin panel"
    ],
    useCases: [
      "Let members spend earned points on real items",
      "Sell community merchandise and services",
      "Reach buyers across multiple communities",
      "Accept currency and crypto payments"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: marketplaceImage
  },
  "technology-architecture": {
    icon: ShieldCheck,
    title: "Technology & Architecture",
    subtitle: "Enterprise-grade, built to scale",
    description: "API-first, cloud-based architecture with enterprise-grade security, tenant-level data isolation and SEO-optimised experiences.",
    heroDescription: "Modern cloud-based architecture built using industry-standard technologies — an API-first platform powering both web and mobile applications, capable of supporting thousands of independent communities.",
    benefits: [
      "Modern cloud-based architecture using industry-standard technologies",
      "API-first platform powering both web and mobile applications",
      "Enterprise-grade security with encrypted authentication",
      "Tenant-level data isolation for every community",
      "Integrated payments, transactional email and media delivery",
      "SEO-optimised architecture with responsive web and mobile experiences"
    ],
    useCases: [
      "Scale from one community to thousands",
      "Keep every community's data fully isolated",
      "Rank in search engines with SEO-optimised pages",
      "Serve members on web and mobile from one platform"
    ],
    colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    image: groupsCommunitiesImage
  }
};

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="header-logo">
            <img 
              src={logoPath} 
              alt="Social8 Logo" 
              className="h-10 object-contain"
              data-testid="img-logo"
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6" data-testid="nav-main">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-features">Features</Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" data-testid="button-login">Log In</Button>
          <Button size="sm" data-testid="button-demo">Request Demo</Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const [showApiPopup, setShowApiPopup] = useState(false);

  return (
    <>
      <footer className="border-t bg-muted/30 py-12" data-testid="section-footer">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/">
                <div className="flex items-center gap-2 mb-4 cursor-pointer" data-testid="footer-logo">
                  <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" />
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed" data-testid="text-footer-description">
                Social8 is a leading community management software platform helping clubs and communities connect members, manage events and competitions, enable reciprocal play, and grow participation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-footer-product">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#features" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block" data-testid="link-footer-features">Features</Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block" data-testid="link-footer-pricing">Pricing</Link>
                </li>
                <li>
                  <button onClick={() => setShowApiPopup(true)} className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block text-left" data-testid="link-footer-integrations">Integrations</button>
                </li>
                <li>
                  <button onClick={() => setShowApiPopup(true)} className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block text-left" data-testid="link-footer-api">API</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-footer-company">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block" data-testid="link-footer-contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {new Date().getFullYear()} Social8. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded" data-testid="link-privacy">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded" data-testid="link-terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {showApiPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowApiPopup(false)} data-testid="popup-api-overlay">
          <div className="bg-card border rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()} data-testid="popup-api">
            <h3 className="text-lg font-bold mb-3" data-testid="heading-api-popup">Integrations & API</h3>
            <p className="text-muted-foreground mb-4" data-testid="text-api-popup">
              Contact our team for access to our integration tools and API.
            </p>
            <div className="flex gap-3">
              <Link href="/contact">
                <Button data-testid="button-api-contact">Contact Us</Button>
              </Link>
              <Button variant="outline" onClick={() => setShowApiPopup(false)} data-testid="button-api-close">Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function FeaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const feature = slug ? featuresData[slug as keyof typeof featuresData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const defaultTitle = "Community Management Software for Clubs & Members | Social8";
    const defaultDescription = "Social8 is an all-in-one community management platform for clubs and communities. Manage members, events, competitions, content, and reciprocal play from one powerful system.";
    const defaultImage = "/favicon.png";
    const defaultUrl = "https://social8.app";
    
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      const tag = document.querySelector(selector);
      if (tag) tag.setAttribute(attribute, value);
    };
    
    if (feature) {
      const featureTitle = `${feature.title} | Social8`;
      const featureDescription = feature.heroDescription;
      const featureUrl = `${defaultUrl}/features/${slug}`;
      
      document.title = featureTitle;
      
      updateMetaTag('meta[name="description"]', 'content', featureDescription);
      updateMetaTag('meta[property="og:title"]', 'content', featureTitle);
      updateMetaTag('meta[property="og:description"]', 'content', featureDescription);
      updateMetaTag('meta[property="og:url"]', 'content', featureUrl);
      updateMetaTag('meta[property="og:image"]', 'content', defaultImage);
      updateMetaTag('meta[name="twitter:title"]', 'content', featureTitle);
      updateMetaTag('meta[name="twitter:description"]', 'content', featureDescription);
    } else {
      document.title = "Feature Not Found | Social8";
    }
    
    return () => {
      document.title = defaultTitle;
      updateMetaTag('meta[name="description"]', 'content', defaultDescription);
      updateMetaTag('meta[property="og:title"]', 'content', defaultTitle);
      updateMetaTag('meta[property="og:description"]', 'content', defaultDescription);
      updateMetaTag('meta[property="og:url"]', 'content', defaultUrl);
      updateMetaTag('meta[property="og:image"]', 'content', defaultImage);
      updateMetaTag('meta[name="twitter:title"]', 'content', "Community Management Software | Social8");
      updateMetaTag('meta[name="twitter:description"]', 'content', "All-in-one community management platform. Manage members, events, competitions, and reciprocal play.");
    };
  }, [feature, slug]);

  if (!feature) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Feature not found</h1>
            <Link href="/" data-testid="link-back-home">
              <Button data-testid="button-back-home">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = feature.icon;

  return (
    <div className="min-h-screen flex flex-col" data-testid={`page-feature-${slug}`}>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-6 gap-2"
              data-testid="button-back"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/#features";
                }
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Features
            </Button>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 min-w-16 min-h-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" data-testid="heading-feature-title">
                      {feature.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2" data-testid="text-feature-subtitle">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-feature-hero-description">
                  {feature.heroDescription}
                </p>
                
                <div className="pt-4">
                  <h3 className="font-bold text-xl mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3" data-testid={`benefit-${i}`}>
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-muted/50 rounded-xl p-4 border border-border/50 shadow-2xl">
                  {feature.image ? (
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full rounded-lg shadow-md ring-1 ring-black/5"
                      data-testid="img-feature"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <IconComponent className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Feature preview coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-600 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-8">
                Join the growing communities already using Social8 to engage their members and part of the new rewards economy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/create-account">
                  <Button size="lg" className="gap-2 bg-white text-emerald-700 hover:bg-white/90" data-testid="button-start-trial-cta">
                    Go Live Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-contact-us-cta">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
