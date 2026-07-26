import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/social8logo_1785094677762.png";
import { Link, useParams } from "wouter";
import { 
  Users, 
  Globe, 
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Settings,
  Heart
} from "lucide-react";

const benefitsData = {
  "member-engagement": {
    icon: Users,
    title: "Increase Member Engagement",
    subtitle: "Build a thriving, active community",
    heroDescription: "Keep your community active and connected with social features designed specifically for members. Create meaningful interactions that bring members together.",
    colorClass: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white",
    details: [
      {
        heading: "Social Networking for Members",
        description: "Give your members a dedicated space to connect, share experiences, and build relationships. Our social features include member profiles, activity feeds, direct messaging, and group discussions - all tailored for your community."
      },
      {
        heading: "Event Participation",
        description: "Drive higher attendance at club events with easy registration, automated reminders, and social sharing. Members can see who's attending, invite friends, and share their experiences afterward."
      },
      {
        heading: "Content Sharing",
        description: "Enable members to share photos, videos, and stories from their rounds. Celebrate achievements, memorable moments, and create a living history of your community's best experiences."
      },
      {
        heading: "Gamification & Achievements",
        description: "Motivate participation with badges, leaderboards, and recognition for active members. Track milestones and celebrate achievements to keep members engaged and coming back."
      }
    ]
  },
  "simplify-management": {
    icon: Settings,
    title: "Simplify Management",
    subtitle: "Powerful tools that save you time",
    heroDescription: "Streamline administrative tasks with powerful tools that save time and reduce complexity. Manage your entire community from one intuitive dashboard.",
    colorClass: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    details: [
      {
        heading: "Centralized Dashboard",
        description: "Access everything you need from a single, intuitive dashboard. View member activity, manage events, publish content, and monitor community health all in one place."
      },
      {
        heading: "Automated Communications",
        description: "Set up automated emails and notifications for event reminders, membership renewals, and important announcements. Save hours of manual communication work every week."
      },
      {
        heading: "Member Management",
        description: "Easily manage member profiles, track participation, handle renewals, and maintain accurate records. Import existing member data and keep everything organized."
      },
      {
        heading: "Reporting & Analytics",
        description: "Get insights into member engagement, event attendance, and community growth. Make data-driven decisions with comprehensive reports and visualizations."
      }
    ]
  },
  "inter-club-play": {
    icon: Globe,
    title: "Grow Inter-Club Play",
    subtitle: "Expand your network",
    heroDescription: "Expand your network with reciprocal play arrangements and inter-club competitions. Connect your members with communities across the region and beyond.",
    colorClass: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white",
    details: [
      {
        heading: "Reciprocal Play Arrangements",
        description: "Easily set up and manage reciprocal play agreements with other clubs. Your members gain access to new venues while you welcome visiting members to yours."
      },
      {
        heading: "Inter-Club Competitions",
        description: "Organize tournaments and competitions between clubs. Manage team selections, handicaps, scoring, and results all within the platform."
      },
      {
        heading: "Tee Time Sharing",
        description: "Share available tee times with partner clubs and communities. Fill unused slots while giving your members more playing opportunities."
      },
      {
        heading: "Network Discovery",
        description: "Discover and connect with communities in your region. Build relationships that benefit your members and grow the wider community."
      }
    ]
  },
  "revenue-streams": {
    icon: TrendingUp,
    title: "Create Revenue Streams",
    subtitle: "Unlock new financial opportunities",
    heroDescription: "Unlock new opportunities for sponsorships, events, and premium member experiences. Turn your engaged community into sustainable revenue.",
    colorClass: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    details: [
      {
        heading: "Sponsorship Opportunities",
        description: "Attract sponsors with detailed engagement metrics and targeted visibility. Offer sponsors banner placement, event naming rights, and direct access to your engaged member base."
      },
      {
        heading: "Premium Events",
        description: "Host paid events, tournaments, and experiences. Handle registrations, payments, and communications all in one place with built-in payment processing."
      },
      {
        heading: "Membership Tiers",
        description: "Create premium membership levels with exclusive benefits. Offer enhanced features, priority booking, and special access to drive upgrade revenue."
      },
      {
        heading: "Partner Promotions",
        description: "Partner with brands, shops, and local businesses. Share exclusive offers with your members while earning referral revenue."
      }
    ]
  },
  "improve-retention": {
    icon: Heart,
    title: "Improve Retention",
    subtitle: "Keep members coming back",
    heroDescription: "Build lasting connections that keep members coming back season after season. Create a community experience that members don't want to leave.",
    colorClass: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white",
    details: [
      {
        heading: "Community Belonging",
        description: "Foster a sense of belonging that goes beyond activities. Members who feel connected to their community are far more likely to renew and stay active."
      },
      {
        heading: "Personalized Experience",
        description: "Deliver personalized content, event recommendations, and communications based on member preferences and activity. Make every member feel valued."
      },
      {
        heading: "Year-Round Engagement",
        description: "Keep members engaged even during the off-season with social features, planning tools, and community content. Maintain connections when they can't be on the course."
      },
      {
        heading: "Feedback & Improvement",
        description: "Gather member feedback through surveys and polls. Show members their input matters by acting on suggestions and communicating improvements."
      }
    ]
  }
};

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" data-testid="link-header-logo">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src={logoPath} 
              alt="Social8 Logo" 
              className="h-10 object-contain"
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#features" data-testid="link-nav-features">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Features</span>
          </Link>
          <Link href="/#benefits" data-testid="link-nav-benefits">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Benefits</span>
          </Link>
          <Link href="/#pricing" data-testid="link-nav-pricing">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Pricing</span>
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" data-testid="button-login">Log In</Button>
          <Button size="sm" data-testid="button-get-started">Get Started</Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logoPath} alt="Social8" className="h-8 object-contain" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Social8. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function BenefitPage() {
  const { slug } = useParams<{ slug: string }>();
  const benefit = slug ? benefitsData[slug as keyof typeof benefitsData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const defaultTitle = "Community Management Software for Clubs & Members | Social8";
    const defaultDescription = "Social8 is an all-in-one community management platform for clubs and communities. Manage members, events, competitions, content, and reciprocal play from one powerful system.";
    
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      const tag = document.querySelector(selector);
      if (tag) tag.setAttribute(attribute, value);
    };
    
    if (benefit) {
      const benefitTitle = `${benefit.title} | Social8`;
      const benefitDescription = benefit.heroDescription;
      
      document.title = benefitTitle;
      updateMetaTag('meta[name="description"]', 'content', benefitDescription);
      updateMetaTag('meta[property="og:title"]', 'content', benefitTitle);
      updateMetaTag('meta[property="og:description"]', 'content', benefitDescription);
    } else {
      document.title = "Benefit Not Found | Social8";
    }
    
    return () => {
      document.title = defaultTitle;
      updateMetaTag('meta[name="description"]', 'content', defaultDescription);
      updateMetaTag('meta[property="og:title"]', 'content', defaultTitle);
      updateMetaTag('meta[property="og:description"]', 'content', defaultDescription);
    };
  }, [benefit]);

  if (!benefit) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Benefit not found</h1>
            <Link href="/" data-testid="link-back-home">
              <Button data-testid="button-back-home">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = benefit.icon;
  const benefitKeys = Object.keys(benefitsData);
  const currentIndex = benefitKeys.indexOf(slug || "");
  const prevBenefit = benefitKeys[(currentIndex - 1 + benefitKeys.length) % benefitKeys.length];
  const nextBenefit = benefitKeys[(currentIndex + 1) % benefitKeys.length];

  return (
    <div className="min-h-screen flex flex-col" data-testid={`page-benefit-${slug}`}>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Link href="/#benefits" data-testid="link-back-benefits">
              <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
                <ArrowLeft className="w-4 h-4" />
                Back to Benefits
              </Button>
            </Link>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${benefit.colorClass} shadow-lg`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="heading-benefit-title">
                      {benefit.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2" data-testid="text-benefit-subtitle">
                      {benefit.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-benefit-hero-description">
                  {benefit.heroDescription}
                </p>
                
                <div className="pt-4">
                  <h3 className="font-bold text-xl mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {benefit.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3" data-testid={`benefit-bullet-${i}`}>
                        <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{detail.heading}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <IconComponent className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Benefit preview coming soon</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <Link href={`/benefits/${prevBenefit}`} data-testid="link-prev-benefit">
                    <Button variant="outline" className="gap-2" data-testid="button-prev-benefit">
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  </Link>
                  <Link href={`/benefits/${nextBenefit}`} data-testid="link-next-benefit">
                    <Button variant="outline" className="gap-2" data-testid="button-next-benefit">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl space-y-12">
              {benefit.details.map((detail, i) => (
                <div key={i} className="flex gap-6" data-testid={`detail-${i}`}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3" data-testid={`detail-heading-${i}`}>{detail.heading}</h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`detail-desc-${i}`}>{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-600 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-8">
                Join thousands of communities already using Social8 to engage their members.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/create-account">
                  <Button size="lg" className="gap-2 bg-white text-cyan-700" data-testid="button-start-trial-cta">
                    Go Live Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white" data-testid="button-contact-us-cta">
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
