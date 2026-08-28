import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoPath from "@assets/s8logov2_clean.png";
import { ArrowRight, Heart, Leaf, Menu, Sprout, TreePine, Waves, X } from "lucide-react";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";
import MarketingFooter from "@/components/marketing-footer";

const faqs = [
  ["What is Social8?", "Social8 is an all-in-one platform for creating, managing and growing an online community. It brings members, content, events, competitions, polls, groups, messaging and engagement tools together in one place."],
  ["Who is Social8 for?", "Social8 is designed for clubs, grassroots organisations, charities, societies, content creators and other organisations that want to build and manage an engaged online community."],
  ["How is Social8 different from Facebook or WhatsApp?", "Facebook and WhatsApp are useful communication tools, but your community exists within someone else's platform. Social8 gives you a dedicated community environment with your own members, content, events, competitions, groups and management tools — all under your control."],
  ["Do I need technical knowledge to set up Social8?", "No. Social8 has been designed so community owners can create and manage their platform without technical knowledge or developers."],
  ["How quickly can I launch a community?", "You can create your account, configure your community and start inviting members in less than an hour."],
  ["What can members do on Social8?", "Members can connect with each other, join groups, message and comment, participate in events and competitions, respond to polls and petitions, read and publish content, and take part in other community activities."],
  ["Can I customise Social8 for my community?", "Yes. Your community can have its own identity and content. Enterprise customers can also access white-label branding, API access, custom integrations and additional support."],
  ["Can I make money from my community?", "Yes. Social8 is being built not just to help communities engage their members, but also to create opportunities to generate revenue through memberships, activities and other monetisation features."],
  ["Is there a limit on how many members I can have?", "There is no limit to the number of users a community can have. It caters for small communities of less than 20, to large communities of 1000's."],
  ["Is Social8 free?", "The Professional plan is free and includes the core tools needed to build and manage your community. Enterprise pricing is tailored to larger organisations requiring white-label branding, API access or custom integrations."],
];

const climateInitiatives = [
  { icon: TreePine, title: "Tree Planting", text: "Support tree planting projects through everyday community participation." },
  { icon: Waves, title: "Ocean Clean-Up", text: "Help fund ocean plastic removal and cleaner waterways." },
  { icon: Sprout, title: "Biodiversity Projects", text: "Put points towards projects that protect and restore biodiversity." },
  { icon: Heart, title: "Charitable Giving", text: "Support charitable projects selected through the Social8 marketplace." },
];

const navLinks = [
  { href: "/#vision", label: "Our Vision" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export default function SectionLandingPage() {
  const [location] = useLocation();
  const isFaq = location === "/faq";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const title = isFaq ? "Frequently Asked Questions | Social8" : "Climate Positive Communities | Social8";
    const description = isFaq
      ? "Find answers about Social8, the all-in-one community platform for clubs, organisations, charities, creators and membership communities."
      : "See how Social8 communities can support tree planting, ocean clean-up, biodiversity projects and charitable giving through everyday engagement.";
    updatePageSEO({ title, description, url: location });
    const schema = document.createElement("script");
    schema.id = "section-page-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify(
      isFaq
        ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
        : { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: `https://social8.app${location}` },
    );
    document.head.appendChild(schema);
    return () => {
      schema.remove();
      resetPageSEO();
    };
  }, [isFaq, location]);

  return (
    <div className="min-h-screen flex flex-col" data-testid={`page-${isFaq ? "faq" : "climate-positive"}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          <Link href="/"><img src={logoPath} alt="Social8 Logo" className="h-10 object-contain" /></Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover-elevate px-2 py-1 rounded-md">{link.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/create-account"><Button size="sm">Create Account</Button></Link>
            <Button size="icon" variant="outline" className="md:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="section-mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && <nav id="section-mobile-navigation" className="md:hidden border-t bg-background px-4 py-3 grid gap-1">{navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">{link.label}</Link>)}</nav>}
      </header>

      {isFaq ? (
        <main className="flex-1">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-4">Social8 FAQs</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">Everything you need to know about building your community with Social8.</p>
            </div>
          </section>
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-left font-semibold">{question}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{answer}</AccordionContent></AccordionItem>)}
              </Accordion>
              <div className="text-center mt-12"><Link href="/create-account"><Button size="lg">Build Your Community <ArrowRight className="w-4 h-4 ml-2" /></Button></Link></div>
            </div>
          </section>
        </main>
      ) : (
        <main className="flex-1">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-background dark:from-emerald-950/30 dark:via-green-950/20 dark:to-background">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6"><Leaf className="w-4 h-4" /> Climate Positive</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Powered. <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Planet Focused.</span></h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Social8 communities don't just connect people—they can create real environmental impact through everyday engagement, while keeping community participation at the centre.</p>
            </div>
          </section>
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid sm:grid-cols-2 gap-6">
                {climateInitiatives.map(({ icon: Icon, title, text }) => <Card key={title} className="hover-elevate"><CardContent className="p-7 text-center"><div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg"><Icon className="w-7 h-7 text-white" /></div><h2 className="text-xl font-semibold mb-2">{title}</h2><p className="text-muted-foreground">{text}</p></CardContent></Card>)}
              </div>
              <div className="text-center mt-12"><p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">Environmental action is an optional part of the wider Social8 rewards and marketplace experience, helping communities choose how they put participation to work.</p><Link href="/rewards/community-rewards"><Button size="lg">Explore Community Rewards <ArrowRight className="w-4 h-4 ml-2" /></Button></Link></div>
            </div>
          </section>
        </main>
      )}
      <MarketingFooter />
    </div>
  );
}