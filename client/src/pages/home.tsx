import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoPath from "@assets/image_1785138412166.png";
import faviconPath from "@assets/favicon-32x32_1774860507485.png";
import { Link } from "wouter";
import { 
  Users, 
  Calendar, 
  Globe, 
  FileText, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Building,
  Trophy,
  Play,
  Settings,
  Heart,
  Zap,
  HelpCircle,
  Gift,
  Gavel,
  CreditCard,
  ShieldCheck
} from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2" data-testid="header-logo">
          <img 
            src={logoPath} 
            alt="Social8 Logo" 
            className="h-10 object-contain"
            data-testid="img-logo"
          /><span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">social<span className="text-cyan-600">8</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-6" data-testid="nav-main">
          <a href="/#features" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-features">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-how-it-works">How It Works</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/create-account">
            <Button size="sm" data-testid="button-create-account">Create Account</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-12 lg:py-20" data-testid="section-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" data-testid="heading-hero">
              The <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">Ultimate</span> online platform to{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">grow</span>,{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">manage</span>, and{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">empower</span> your community
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed" data-testid="text-hero-description">
              Social 8 helps communities to connect members, manage content, events, polls, petitions, quizzes, auctions and competitions, use powerful AI to extend the platform, share content and more — all from one powerful platform.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/create-account">
                <Button size="lg" className="gap-2" data-testid="button-start-trial">
                  Go Live Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="https://social8community.social8.app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-platform">
                  <Play className="w-4 h-4" />
                  View Platform
                </Button>
              </a>
            </div>
          </div>
          <div className="relative" data-testid="hero-dashboard-preview">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-green-500/5"></div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <img src={faviconPath} alt="" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" data-testid="text-dashboard-title">Admin Dashboard</div>
                      <div className="text-xs text-muted-foreground">Social8</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300">Live</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-cyan-50 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900/50">
                    <CardContent className="p-3">
                      <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400" data-testid="stat-members">1,247</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/50">
                    <CardContent className="p-3">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400" data-testid="stat-events">89</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-50 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900/50">
                    <CardContent className="p-3">
                      <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400" data-testid="stat-groups">156</div>
                      <div className="text-xs text-muted-foreground">Groups</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Recent Activity</div>
                  {[
                    { name: "John D.", action: "joined The Surrey Society", time: "2m ago" },
                    { name: "Sarah M.", action: "created new event", time: "15m ago" },
                    { name: "Mike R.", action: "requested access", time: "1h ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50" data-testid={`activity-item-${i}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                          {activity.name.charAt(0)}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">{activity.name}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-64 rounded-lg shadow-xl border bg-card p-4 hidden lg:block" data-testid="upcoming-events-widget">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm font-medium">Upcoming Events</div>
              </div>
              <div className="space-y-2">
                {["Monthly Medal", "Club Championship"].map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-xs" data-testid={`upcoming-event-${i}`}>
                    <span>{event}</span>
                    <Badge variant="secondary" className="text-xs">Soon</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Multi-Tenancy",
      description: "One platform, unlimited communities. Every community runs as its own fully branded, isolated environment with its own domain, members, content and data.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "multi-tenancy"
    },
    {
      icon: Zap,
      title: "Zero-Friction Signup",
      description: "Communities launch in minutes and members join in seconds — simple email signup with one-time-code verification or single sign-on, no approval queues required.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "zero-friction-signup"
    },
    {
      icon: Settings,
      title: "Fully Self-Managed",
      description: "Run your entire community through an intuitive admin panel — branding, content, members, events and monetisation — with no technical skills needed.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "self-management"
    },
    {
      icon: FileText,
      title: "Community & Content",
      description: "Editorial articles, podcasts, member reviews, polls, newsletters and a social feed with posts, comments, replies and reactions — plus public and private groups.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "community-content"
    },
    {
      icon: Calendar,
      title: "Events & Competitions",
      description: "Event listings with attendance tracking, member-suggested events, and a competition engine with individual, team and knockout formats plus live leaderboards.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "events-competitions"
    },
    {
      icon: HelpCircle,
      title: "Live Quizzes",
      description: "Scheduled live quiz events where the whole community plays the same questions at the same time, with rich question formats, speed bonuses and live leaderboards.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "live-quizzes"
    },
    {
      icon: Trophy,
      title: "Earn Points & Leaderboards",
      description: "A platform-wide points economy rewarding participation, with owner-configurable earning rules and monthly leaderboards that keep everyone competitive.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "points-leaderboards"
    },
    {
      icon: Gift,
      title: "Redeem Points",
      description: "Members redeem earned points for instant digital rewards from a fully customisable catalogue — driving retention and long-term member loyalty.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "redeem-points"
    },
    {
      icon: Gavel,
      title: "Prize Auctions",
      description: "Members spend earned points bidding on real prizes in owner-run auctions with live countdowns, escrow-held bids and instant outbid notifications.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "prize-auctions"
    },
    {
      icon: Users,
      title: "Members & Networking",
      description: "Member profiles with customisable fields, advanced search, connection requests, organisation profiles with exclusive offers, and member wallets.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "members-networking"
    },
    {
      icon: CreditCard,
      title: "Monetisation",
      description: "Premium subscriptions, paid events and competitions, a cross-community marketplace, advertising revenue share and paid polls — via Stripe or cryptocurrency.",
      colorClass: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400",
      slug: "monetisation"
    },
    {
      icon: ShieldCheck,
      title: "Technology & Architecture",
      description: "API-first, cloud-based architecture with enterprise-grade security, tenant-level data isolation and SEO-optimised web and mobile experiences.",
      colorClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
      slug: "technology-architecture"
    }
  ];

  return (
    <section id="features" className="pt-10 lg:pt-14 pb-20 lg:pb-28 bg-muted/30" data-testid="section-features">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-green-500/10 to-cyan-500/10 rounded-2xl blur-3xl"></div>
          <Card className="relative border-0 bg-gradient-to-br from-card/80 to-card shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Community Platform
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text" data-testid="heading-features">
                Build a Thriving Online Community
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6">
                Everything You Need to Grow, Engage, and Manage Your Community
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-features-description">
                Social8 is a modern community software platform designed for societies, content creators and independent communities looking to increase engagement, participation, and revenue.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Easy Setup</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>No Technical Skills Required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Free Trial Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center" data-testid="heading-features-label">Features</h2>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Link href={`/features/${feature.slug}`} key={i} data-testid={`link-feature-${i}`}>
              <Card className="group hover-elevate border-border/50 transition-all duration-300 h-full cursor-pointer" data-testid={`card-feature-${i}`}>
                <CardContent className="p-6 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-xl mb-5 flex items-center justify-center ${feature.colorClass} shadow-sm`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-3" data-testid={`heading-feature-${i}`}>{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1" data-testid={`text-feature-${i}`}>{feature.description}</p>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all" data-testid={`link-learn-more-${i}`}>
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-600 to-green-600 relative overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="heading-cta">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of communities already using Social8 to engage their members.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://social8community.social8.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-white text-cyan-700" data-testid="button-view-platform-home">
                View Platform
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white" data-testid="button-contact-us-home">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create Your Community Website",
      description: "Launch a branded community website with full admin controls.",
      icon: Building
    },
    {
      number: "02",
      title: "Engage Your Members",
      description: "Enable members to connect, chat, comment and join interest groups.",
      icon: Users
    },
    {
      number: "03",
      title: "Create Events and Competitions",
      description: "Launch community events and competitions further engaging members.",
      icon: Calendar
    },
    {
      number: "04",
      title: "Create an Active and Engaged Community",
      description: "Foster meaningful connections and keep members coming back with interactive features, discussions, and shared experiences.",
      icon: Globe
    },
    {
      number: "05",
      title: "Track Performance",
      description: "Monitor member activity, event participation, and community growth.",
      icon: TrendingUp
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-20" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-how-it-works">
            How It Works
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-6 group" data-testid={`step-${i}`}>
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white shadow-lg">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="flex-1 pb-6 border-b border-border/50 group-last:border-0 group-last:pb-0">
                <h3 className="font-bold text-lg mb-2" data-testid={`heading-step-${i}`}>{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-step-${i}`}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoIsItForSection() {
  const audiences = [
    { title: "Sports", icon: Trophy },
    { title: "Grass Roots", icon: Users },
    { title: "Charity", icon: Heart },
    { title: "Communities", icon: Building },
    { title: "Content Creators", icon: Globe }
  ];

  return (
    <section className="py-16 lg:py-20 bg-muted/30" data-testid="section-who-is-it-for">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-who-is-it-for">
            Who is it for?
          </h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-5 lg:gap-6">
            {audiences.map((audience, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-52 lg:w-auto p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/30 shadow-md hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300 text-center group"
                data-testid={`audience-${i}`}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <audience.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-semibold text-foreground" data-testid={`heading-audience-${i}`}>{audience.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LaunchCTASection() {
  return (
    <section className="py-6 lg:py-8" data-testid="section-launch-cta">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 to-green-600 p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-shrink-0 bg-white/95 rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3">
              <img 
                src={logoPath} 
                alt="Social8" 
                className="w-40 md:w-48 lg:w-56 object-contain"
                data-testid="img-launch-cta-logo"
              />
              <span className="text-3xl font-bold tracking-tight text-slate-800">social<span className="text-cyan-600">8</span></span>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-center lg:text-left" data-testid="heading-launch-cta">
                Launch your online community
              </h2>
              <p className="text-white/90 text-lg mb-6 text-center lg:text-left" data-testid="text-launch-cta-subtext">
                Create your account and your community platform can be live in less than an hour.
              </p>
              <div className="w-full flex justify-center lg:justify-start">
                <Link href="/create-account">
                  <Button size="lg" className="bg-white text-cyan-700 hover:bg-white/90 shadow-lg" data-testid="button-create-account-cta">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      quote: "Social8 has transformed how we manage our 500+ member society. Event management is now a breeze!",
      author: "James Thompson",
      role: "Secretary, Surrey Society",
      rating: 5
    },
    {
      quote: "The activity calendars feature has opened up so many new opportunities for our members. Highly recommended.",
      author: "Sarah Mitchell",
      role: "Captain, Kent Club",
      rating: 5
    },
    {
      quote: "We've seen a 200% increase in member engagement since switching to Social8.",
      author: "Michael Roberts",
      role: "Manager, Essex Association",
      rating: 5
    }
  ];

  return (
    <section className="py-8 lg:py-10 bg-muted/30" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-testimonials">
            Testimonials
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-testimonials-subtitle">
            Trusted by Clubs and Communities Across the UK
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="hover-elevate h-full" data-testid={`card-testimonial-${i}`}>
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1" data-testid={`text-testimonial-quote-${i}`}>"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50 mt-auto">
                  <div className="w-12 h-12 rounded-lg bg-muted/80 border border-border/50 flex items-center justify-center">
                    <Building className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="font-semibold text-sm" data-testid={`text-testimonial-author-${i}`}>{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground" data-testid={`text-testimonial-role-${i}`}>{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="pt-5 lg:pt-7 pb-20 lg:pb-28" data-testid="section-pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-pricing">
            Choose your Plan
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-pricing-description">
            Transparent monthly or annual subscriptions. Start growing your community today.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover-elevate h-full border-cyan-300 dark:border-cyan-700 relative" data-testid="card-pricing-professional">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-cyan-600 dark:bg-cyan-500" data-testid="badge-popular">Most Popular</Badge>
            </div>
            <CardContent className="p-6 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg mb-2" data-testid="heading-plan-professional">Professional</h3>
                <div className="text-4xl font-bold mb-1" data-testid="text-price-professional"><span className="line-through text-muted-foreground">£49/mo</span></div>
                <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Free for limited period</div>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                {["Up to 500 members", "Publish articles, polls, petitions, and podcasts", "Private and public social media groups", "Advanced competitions", "Activity Calendars", "Content publishing", "Priority support"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" data-testid={`text-pro-feature-${i}`}>
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/create-account">
                <Button className="w-full mt-auto" data-testid="button-start-trial-pro">Go Live Now</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover-elevate h-full" data-testid="card-pricing-enterprise">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg mb-2" data-testid="heading-plan-enterprise">Enterprise</h3>
                <div className="text-4xl font-bold mb-1" data-testid="text-price-enterprise">£POA<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <div className="text-sm text-muted-foreground">Billed annually</div>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                {["Unlimited members", "White-label branding", "API access", "Dedicated support", "Custom integrations"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" data-testid={`text-enterprise-feature-${i}`}>
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button variant="outline" className="w-full mt-auto" data-testid="button-contact-us">Contact Us</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
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
              <div className="flex items-center gap-2 mb-4" data-testid="footer-logo">
                <img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" /><span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">social<span className="text-cyan-600">8</span></span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed" data-testid="text-footer-description">
                Social8 is a leading community management software platform helping clubs and communities connect members, manage events and competitions, manage activity calendars, and grow participation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-footer-product">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block" data-testid="link-footer-features">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-muted-foreground hover-elevate px-1 py-0.5 rounded inline-block" data-testid="link-footer-pricing">Pricing</a>
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

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <HowItWorksSection />
        <WhoIsItForSection />
        <LaunchCTASection />
        <SocialProofSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
