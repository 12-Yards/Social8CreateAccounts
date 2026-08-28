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
} from "lucide-react";
import { resetPageSEO, updatePageSEO } from "@/lib/seo";

type LandingPage = {
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  hero: string;
  intro: string;
  benefits: string[];
  points: { title: string; text: string }[];
  image: string;
  imageAlt: string;
  icon: typeof Users;
  related: { label: string; href: string }[];
};

const pages: Record<string, LandingPage> = {
  "/community-platform": {
    title: "Community Platform",
    metaTitle: "Community Platform for Clubs, Organisations & Creators | Social8",
    description: "Build a branded online community with members, content, events, groups, rewards and everything you need to grow participation.",
    eyebrow: "The community operating system",
    hero: "Everything your community needs, in one place.",
    intro: "Social8 gives clubs, organisations, creators and independent communities a professional digital home they control. Bring members, content, events, conversations and rewards together without stitching together multiple tools.",
    benefits: ["Branded community website and mobile experience", "Members, groups, messaging and social content", "Events, competitions, polls and petitions", "Built-in points, rewards and marketplace tools", "Simple setup with ongoing hosting and support", "A platform that grows with your community"],
    points: [
      { title: "Connect members", text: "Give people a place to find each other, join groups, share updates and stay involved." },
      { title: "Run everything", text: "Manage content, events, competitions, communications and engagement from one platform." },
      { title: "Grow participation", text: "Use points, rewards and meaningful community activity to give members more reasons to return." },
    ],
    image: mobileAppImage,
    imageAlt: "Social8 community platform shown across web and mobile",
    icon: Globe,
    related: [{ label: "Community management software", href: "/community-management-software" }, { label: "Community app", href: "/community-app" }, { label: "White-label platform", href: "/white-label/white-label-community-platform" }],
  },
  "/community-management-software": {
    title: "Community Management Software",
    metaTitle: "Community Management Software for Modern Organisations | Social8",
    description: "Manage members, content, events, groups, competitions and rewards with Social8 community management software.",
    eyebrow: "Manage with confidence",
    hero: "The simpler way to run an active community.",
    intro: "Social8 replaces disconnected spreadsheets, chat groups and event tools with one intuitive management system. Owners and administrators can organise the day-to-day running of their community without technical knowledge.",
    benefits: ["Member profiles, roles and permissions", "Content publishing and moderation workflows", "Event and competition management", "Private and public groups", "Configurable points and engagement rules", "Hosting, maintenance and platform support included"],
    points: [
      { title: "One clear admin panel", text: "Keep members, content, events and community settings organised in one place." },
      { title: "Less admin overhead", text: "Create repeatable workflows for publishing, approvals, communications and member management." },
      { title: "More useful engagement", text: "Move beyond announcements with groups, competitions, quizzes, points and rewards." },
    ],
    image: adminPanelImage,
    imageAlt: "Social8 community management admin panel",
    icon: Settings,
    related: [{ label: "Community platform", href: "/community-platform" }, { label: "Sports community platform", href: "/sports/sports-community-platform" }, { label: "Membership platform", href: "/membership/membership-community-platform" }],
  },
  "/community-app": {
    title: "Community App",
    metaTitle: "Community App for Members, Clubs & Organisations | Social8",
    description: "Give members a dedicated community app and web experience for content, groups, events, competitions, messaging and rewards.",
    eyebrow: "Your community in members' hands",
    hero: "A community app people want to open.",
    intro: "Social8 gives members a smooth, branded way to access their community wherever they are. Connect the everyday experience—updates, groups, events, competitions and rewards—in one place across web and mobile.",
    benefits: ["Branded member experience across web and mobile", "Member profiles, groups, comments and messaging", "Event calendars and competition participation", "Live quizzes, leaderboards and points", "Marketplace access for rewards and gift cards", "Fast, low-friction sign-up"],
    points: [
      { title: "Keep members connected", text: "Make it easy to see what is happening, find people and join conversations." },
      { title: "Make activity visible", text: "Bring events, competitions, polls and community content into one member experience." },
      { title: "Reward participation", text: "Give members a clear view of their points, progress and available rewards." },
    ],
    image: mobileAppImage,
    imageAlt: "Social8 community app on mobile and desktop",
    icon: Smartphone,
    related: [{ label: "Community platform", href: "/community-platform" }, { label: "Community rewards", href: "/rewards/community-rewards" }, { label: "White-label community app", href: "/white-label/white-label-community-app" }],
  },
  "/sports": {
    title: "Sports Communities",
    metaTitle: "Sports Community Platform for Clubs & Supporters | Social8",
    description: "Build a stronger sports community with member profiles, fixtures, events, competitions, fan engagement, rewards and groups.",
    eyebrow: "Built for sport",
    hero: "Bring your club, supporters and sporting community together.",
    intro: "Social8 helps sports organisations turn occasional participation into an active year-round community. Give players, supporters, members and partners one place to connect, follow activity and take part.",
    benefits: ["Club-branded community platform", "Fixtures, events and competition management", "Supporter and member engagement tools", "Groups for teams, regions and interests", "Points, leaderboards and rewards", "Partner offers and marketplace opportunities"],
    points: [{ title: "More than match day", text: "Keep supporters and members involved between fixtures with content, groups, quizzes and competitions." }, { title: "One club community", text: "Bring players, families, volunteers, supporters and partners into a shared digital environment." }, { title: "Reward loyalty", text: "Recognise participation and give active members reasons to stay involved throughout the season." }],
    image: eventsImage,
    imageAlt: "Social8 sports events and competition management",
    icon: Trophy,
    related: [{ label: "Sports community platform", href: "/sports/sports-community-platform" }, { label: "Sports fan engagement", href: "/sports/sports-fan-engagement" }, { label: "Football community platform", href: "/sports/football-community-platform" }],
  },
  "/sports/sports-community-platform": {
    title: "Sports Community Platform",
    metaTitle: "Sports Community Platform for Clubs & Sporting Organisations | Social8",
    description: "A dedicated sports community platform for clubs and sporting organisations to manage members, events, competitions and engagement.",
    eyebrow: "For clubs and sporting organisations",
    hero: "The digital home for your whole sports community.",
    intro: "Create a professional club platform that serves every part of your sporting organisation. Social8 connects teams, members, supporters, volunteers and partners around the activity they care about.",
    benefits: ["Club-branded web and mobile experience", "Team, member and supporter groups", "Events, fixtures and competition formats", "Results, leaderboards and live updates", "Club content, announcements and discussions", "Rewards that encourage participation"],
    points: [{ title: "Organise activity", text: "Manage events and competitions while giving members a clear calendar and place to participate." }, { title: "Grow belonging", text: "Create spaces for teams, supporters, families and different interests within one club community." }, { title: "Build a stronger club", text: "Use participation data and rewards to keep your community active beyond the field." }],
    image: eventsImage,
    imageAlt: "Sports club events and competitions on Social8",
    icon: Trophy,
    related: [{ label: "Sports fan engagement", href: "/sports/sports-fan-engagement" }, { label: "Football community platform", href: "/sports/football-community-platform" }, { label: "Community rewards", href: "/rewards/community-rewards" }],
  },
  "/sports/sports-fan-engagement": {
    title: "Sports Fan Engagement",
    metaTitle: "Sports Fan Engagement Platform for Clubs & Supporters | Social8",
    description: "Engage sports fans between matches with content, groups, live quizzes, competitions, points, rewards and community experiences.",
    eyebrow: "Turn followers into participants",
    hero: "Give every supporter more ways to be part of the club.",
    intro: "Social8 helps sports organisations build an ongoing relationship with their fan base. Publish content, run interactive activity and reward participation so your community stays active before, during and after every event.",
    benefits: ["Fan content and club updates", "Match-day and event conversations", "Live quizzes and competitions", "Supporter groups and member profiles", "Points, leaderboards and redeemable rewards", "Direct club-owned engagement channel"],
    points: [{ title: "Create anticipation", text: "Use previews, polls and quizzes to build interest before the next fixture or event." }, { title: "Keep the conversation going", text: "Give fans groups and content spaces that work beyond social media algorithms." }, { title: "Make loyalty tangible", text: "Reward activity with points, gift cards, experiences and other real value." }],
    image: pointsImage,
    imageAlt: "Social8 fan engagement points and leaderboards",
    icon: Users,
    related: [{ label: "Sports community platform", href: "/sports/sports-community-platform" }, { label: "Football community platform", href: "/sports/football-community-platform" }, { label: "Community gamification", href: "/rewards/community-gamification" }],
  },
  "/sports/football-community-platform": {
    title: "Football Community Platform",
    metaTitle: "Football Community Platform for Clubs, Fans & Members | Social8",
    description: "Connect football clubs, supporters and members with a branded community platform for content, fixtures, competitions and rewards.",
    eyebrow: "For football clubs and fan communities",
    hero: "Build a football community beyond the 90 minutes.",
    intro: "Social8 gives football clubs and fan organisations a direct digital home for supporters. Keep fans close with club content, discussion groups, competitions, match activity and rewards throughout the season.",
    benefits: ["Club and supporter-branded experience", "Fixture and event updates", "Fan groups and member conversations", "Match-day polls and live quizzes", "Competitions, leaderboards and points", "Gift cards and partner rewards"],
    points: [{ title: "Own the relationship", text: "Create a direct channel to supporters instead of relying only on third-party social platforms." }, { title: "Make match day interactive", text: "Add polls, quizzes, discussion and competition activity around every fixture." }, { title: "Support the season", text: "Keep members engaged with content and rewards from pre-season to the final whistle." }],
    image: eventsImage,
    imageAlt: "Football events and competitions on Social8",
    icon: Trophy,
    related: [{ label: "Sports fan engagement", href: "/sports/sports-fan-engagement" }, { label: "Sports community platform", href: "/sports/sports-community-platform" }, { label: "Community app", href: "/community-app" }],
  },
  "/charities": {
    title: "Charity Communities",
    metaTitle: "Charity Community Platform for Supporters & Fundraisers | Social8",
    description: "Build an engaged charity community with supporter groups, campaigns, events, content, rewards and meaningful participation.",
    eyebrow: "Built for purpose-led organisations",
    hero: "Turn support into an active charity community.",
    intro: "Social8 helps charities bring supporters, volunteers, fundraisers and beneficiaries together in a space they control. Share your work, organise activity and make it easier for people to stay involved.",
    benefits: ["Charity-branded digital community", "Supporter, volunteer and campaign groups", "Fundraising events and community activities", "Stories, updates, polls and petitions", "Participation points and rewards", "Environmental and charitable action opportunities"],
    points: [{ title: "Keep supporters close", text: "Give supporters a place to follow progress, share stories and connect with others who care." }, { title: "Mobilise action", text: "Organise events, campaigns, petitions and activities from one community platform." }, { title: "Show the difference", text: "Make participation visible and help members see how everyday engagement contributes to positive change." }],
    image: marketplaceImage,
    imageAlt: "Social8 community marketplace supporting positive actions",
    icon: HeartHandshake,
    related: [{ label: "Charity community platform", href: "/charities/charity-community-platform" }, { label: "Charity engagement platform", href: "/charities/charity-engagement-platform" }, { label: "Community rewards", href: "/rewards/community-rewards" }],
  },
  "/charities/charity-community-platform": {
    title: "Charity Community Platform",
    metaTitle: "Charity Community Platform for Supporters, Volunteers & Fundraisers | Social8",
    description: "A dedicated charity community platform for supporter engagement, fundraising activity, events, content and campaigns.",
    eyebrow: "One place for your supporters",
    hero: "Bring your charity community together around the cause.",
    intro: "Social8 gives charities a branded platform for the full supporter journey. Connect people who donate, volunteer, fundraise, attend events and advocate for your mission.",
    benefits: ["Supporter and volunteer profiles", "Campaign, fundraising and event groups", "Content publishing and updates", "Polls, petitions and community discussions", "Engagement rewards and leaderboards", "Flexible platform for growing organisations"],
    points: [{ title: "Create belonging", text: "Help supporters connect with one another, not just with the organisation." }, { title: "Coordinate campaigns", text: "Give every campaign, event or fundraising initiative a clear home and audience." }, { title: "Build lasting support", text: "Stay connected after a donation or event with useful content and ongoing participation." }],
    image: yourCommunityImage,
    imageAlt: "Branded charity community platform on Social8",
    icon: HeartHandshake,
    related: [{ label: "Charity engagement platform", href: "/charities/charity-engagement-platform" }, { label: "Community platform", href: "/community-platform" }, { label: "White-label platform", href: "/white-label/white-label-community-platform" }],
  },
  "/charities/charity-engagement-platform": {
    title: "Charity Engagement Platform",
    metaTitle: "Charity Engagement Platform for Supporter Participation | Social8",
    description: "Increase charity engagement with content, groups, events, petitions, quizzes, points and rewards on Social8.",
    eyebrow: "Make every interaction count",
    hero: "A more active relationship with every supporter.",
    intro: "Social8 helps charities turn one-off interactions into meaningful participation. Create regular reasons for supporters to return, contribute, learn, share and take action.",
    benefits: ["Regular supporter content and updates", "Private and public community groups", "Polls, petitions and feedback", "Interactive quizzes and competitions", "Points and real-value rewards", "Clear opportunities to support positive causes"],
    points: [{ title: "Invite participation", text: "Ask questions, collect views and make supporters part of the conversation." }, { title: "Reward commitment", text: "Recognise the people who consistently give their time, attention and support." }, { title: "Extend your reach", text: "Help supporters share your work and invite others into a community they value." }],
    image: pointsImage,
    imageAlt: "Social8 engagement and points experience",
    icon: HeartHandshake,
    related: [{ label: "Charity community platform", href: "/charities/charity-community-platform" }, { label: "Community gamification", href: "/rewards/community-gamification" }, { label: "Community app", href: "/community-app" }],
  },
  "/membership": {
    title: "Membership Communities",
    metaTitle: "Membership Community Platform for Clubs & Organisations | Social8",
    description: "Build a stronger membership community with profiles, groups, content, events, competitions, rewards and member management.",
    eyebrow: "Make membership more valuable",
    hero: "Give members a reason to stay connected.",
    intro: "Social8 helps membership organisations create an experience that goes beyond administration. Bring member communications, activities, connections and rewards into a platform that feels like it belongs to them.",
    benefits: ["Branded member community", "Member profiles, search and connections", "Private and public interest groups", "Events, competitions and polls", "Points, rewards and marketplace access", "Simple management with no technical skills"],
    points: [{ title: "Improve the member experience", text: "Give members one reliable place to find information, people and activities." }, { title: "Increase participation", text: "Make it easy to discover events, join groups and take part in community life." }, { title: "Strengthen retention", text: "Create ongoing value between renewals with connection, content and rewards." }],
    image: yourCommunityImage,
    imageAlt: "Social8 member community experience",
    icon: Users,
    related: [{ label: "Membership community platform", href: "/membership/membership-community-platform" }, { label: "Membership engagement", href: "/membership/membership-engagement" }, { label: "Community management software", href: "/community-management-software" }],
  },
  "/membership/membership-community-platform": {
    title: "Membership Community Platform",
    metaTitle: "Membership Community Platform for Clubs, Societies & Organisations | Social8",
    description: "A membership community platform for clubs and organisations to connect members, manage activity and grow participation.",
    eyebrow: "For membership-led organisations",
    hero: "A digital home members will actually use.",
    intro: "Social8 brings your membership experience together: profiles, groups, content, events, competitions, communications and rewards in a single branded platform.",
    benefits: ["Member-owned profiles and connections", "Interest, regional and committee groups", "Events and competition management", "Content, announcements and discussions", "Points and member rewards", "Branded web and mobile access"],
    points: [{ title: "Help members find their people", text: "Make it easier to connect around shared interests, location, role or activity." }, { title: "Make activity discoverable", text: "Put every event, group and update in one place members can return to." }, { title: "Offer more than a subscription", text: "Build a sense of belonging and participation around the membership." }],
    image: mobileAppImage,
    imageAlt: "Social8 membership community platform across web and mobile",
    icon: Users,
    related: [{ label: "Membership engagement", href: "/membership/membership-engagement" }, { label: "Community app", href: "/community-app" }, { label: "Community rewards", href: "/rewards/community-rewards" }],
  },
  "/membership/membership-engagement": {
    title: "Membership Engagement",
    metaTitle: "Membership Engagement Platform for Clubs & Societies | Social8",
    description: "Increase membership engagement with groups, content, events, competitions, polls, messaging and rewards.",
    eyebrow: "Keep members involved",
    hero: "Turn membership into an active community.",
    intro: "Social8 gives clubs and societies the tools to create regular, useful and rewarding interactions. Keep members informed, connected and involved throughout the year.",
    benefits: ["Member news and content", "Groups for shared interests and activities", "Events, quizzes and competitions", "Feedback through polls and petitions", "Points, leaderboards and real-value rewards", "Member profiles and networking"],
    points: [{ title: "Communicate both ways", text: "Move beyond one-way email updates with posts, comments, reactions and member feedback." }, { title: "Create regular activity", text: "Give members fresh reasons to visit through events, competitions, content and groups." }, { title: "Recognise involvement", text: "Reward members who contribute, participate and help the community thrive." }],
    image: pointsImage,
    imageAlt: "Social8 membership engagement and rewards",
    icon: Users,
    related: [{ label: "Membership community platform", href: "/membership/membership-community-platform" }, { label: "Community gamification", href: "/rewards/community-gamification" }, { label: "Community app", href: "/community-app" }],
  },
  "/rewards": {
    title: "Community Rewards",
    metaTitle: "Community Rewards Platform for Points, Gift Cards & More | Social8",
    description: "Reward community participation with points that can be converted to withdrawable currency, gift cards, crypto and positive actions.",
    eyebrow: "Rewards with real value",
    hero: "Make participation worth coming back for.",
    intro: "Social8 turns everyday community activity into a rewarding experience. Members can earn points by using and engaging with the platform, then choose how to use that value—from gift cards and crypto to environmental actions.",
    benefits: ["Earn points for meaningful participation", "Convert points to real currency and withdraw it from the platform", "Redeem real-value gift cards for shopping, travel and entertainment", "Use points for cryptocurrency and marketplace value", "Plant trees and support other environmental actions", "Owner-configurable earning and reward rules"],
    points: [{ title: "Earn through engagement", text: "Reward posting, commenting, attending events, entering competitions and contributing to the community." }, { title: "Choose real value", text: "Members can select gift cards, cryptocurrency, withdrawable currency, prizes or other available rewards." }, { title: "Create positive impact", text: "Give members the option to put their points towards tree planting and other environmentally positive actions." }],
    image: pointsImage,
    imageAlt: "Social8 points and community rewards",
    icon: Coins,
    related: [{ label: "Community gamification", href: "/rewards/community-gamification" }, { label: "Convert points to real value", href: "/features/convert-points" }, { label: "Community platform", href: "/community-platform" }],
  },
  "/rewards/community-rewards": {
    title: "Community Rewards",
    metaTitle: "Community Rewards System for Member Engagement | Social8",
    description: "Build a rewards system that gives community members points for participation and real-value ways to redeem them.",
    eyebrow: "Reward the people who show up",
    hero: "Turn active members into your strongest community.",
    intro: "Social8 gives community owners a practical way to recognise participation. Members earn points as they engage, then redeem them for value that matters to them.",
    benefits: ["Configurable points for community activity", "Member wallets and visible balances", "Gift cards for shopping, travel and entertainment", "Withdrawable real currency and crypto options", "Environmental and charitable redemptions", "Leaderboards that make progress visible"],
    points: [{ title: "Set your own rules", text: "Decide which actions deserve recognition and shape rewards around your community." }, { title: "Keep progress visible", text: "Members can see their balance, activity and position as they participate." }, { title: "Reward beyond badges", text: "Offer tangible value that makes engagement meaningful inside and outside the platform." }],
    image: marketplaceImage,
    imageAlt: "Social8 marketplace with gift cards and real-value rewards",
    icon: Coins,
    related: [{ label: "Community gamification", href: "/rewards/community-gamification" }, { label: "Marketplace", href: "/features/marketplace" }, { label: "Community management software", href: "/community-management-software" }],
  },
  "/rewards/community-gamification": {
    title: "Community Gamification",
    metaTitle: "Community Gamification Platform with Points & Leaderboards | Social8",
    description: "Increase community participation with configurable points, live quizzes, competitions, leaderboards and real-value rewards.",
    eyebrow: "Make engagement more engaging",
    hero: "Give members reasons to take part, not just reasons to sign in.",
    intro: "Social8 makes community activity more visible, social and rewarding. Use points, competitions, quizzes and leaderboards to encourage positive participation without losing sight of your community's purpose.",
    benefits: ["Points for configurable member actions", "Monthly and live leaderboards", "Quizzes with speed bonuses and rewards", "Individual, team and knockout competitions", "Redeemable points and marketplace value", "Participation that supports your community goals"],
    points: [{ title: "Create momentum", text: "Visible progress and friendly competition give members a reason to return and contribute." }, { title: "Reward the right actions", text: "Configure earning rules around the behaviours that make your community stronger." }, { title: "Keep it purposeful", text: "Connect gamified activity to real rewards and positive actions, rather than empty points." }],
    image: pointsImage,
    imageAlt: "Social8 community gamification with points and leaderboards",
    icon: Trophy,
    related: [{ label: "Community rewards", href: "/rewards/community-rewards" }, { label: "Sports fan engagement", href: "/sports/sports-fan-engagement" }, { label: "Convert points to real value", href: "/features/convert-points" }],
  },
  "/white-label": {
    title: "White-Label Community Platform",
    metaTitle: "White-Label Community Platform for Organisations | Social8",
    description: "Launch a fully branded, white-label community platform with your own identity, member experience, domain, API and integrations.",
    eyebrow: "Your brand, your community",
    hero: "A complete community platform that feels entirely yours.",
    intro: "Social8 gives organisations the foundation to launch a professional community under their own identity. Enterprise customers can extend the experience with white-label branding, API access, custom integrations and dedicated support.",
    benefits: ["Your name, logo, colours and community identity", "Branded web and mobile member experience", "Custom domain or subdomain options", "Tenant-level data isolation", "API access and custom integrations for Enterprise", "Hosting, security, maintenance and support"],
    points: [{ title: "Own the experience", text: "Create a community that reinforces your organisation instead of sending members elsewhere." }, { title: "Scale securely", text: "Run a focused community or multiple isolated communities on shared infrastructure." }, { title: "Extend when ready", text: "Enterprise options provide APIs, integrations and additional support as your needs grow." }],
    image: yourCommunityImage,
    imageAlt: "Social8 fully branded community platform",
    icon: Globe,
    related: [{ label: "White-label community platform", href: "/white-label/white-label-community-platform" }, { label: "White-label community app", href: "/white-label/white-label-community-app" }, { label: "Your community, fully self-managed", href: "/features/multi-tenancy" }],
  },
  "/white-label/white-label-community-platform": {
    title: "White-Label Community Platform",
    metaTitle: "White-Label Community Platform with Your Own Branding | Social8",
    description: "Launch a community platform under your own brand with custom identity, content, domains, member management and Enterprise integrations.",
    eyebrow: "A platform with your identity",
    hero: "Deliver a community experience under your own brand.",
    intro: "Give members a consistent experience from your organisation, not a generic third-party destination. Social8 supports branded community environments with the tools to manage content, members, activity and growth.",
    benefits: ["Custom platform name, logo and colours", "Branded homepage and member content", "Customisable email templates and legal pages", "Own domain or subdomain options", "Isolated community data and administration", "Enterprise API and integration options"],
    points: [{ title: "Build trust", text: "Keep your identity present throughout the member journey, from sign-up to everyday participation." }, { title: "Manage independently", text: "Control your content, branding, members and engagement modules without technical skills." }, { title: "Fit your organisation", text: "Start with the core platform and extend the experience with Enterprise capabilities when required." }],
    image: yourCommunityImage,
    imageAlt: "Social8 branded community environment",
    icon: Globe,
    related: [{ label: "White-label community app", href: "/white-label/white-label-community-app" }, { label: "Community platform", href: "/community-platform" }, { label: "Fully self-managed", href: "/features/multi-tenancy" }],
  },
  "/white-label/white-label-community-app": {
    title: "White-Label Community App",
    metaTitle: "White-Label Community App for Your Organisation | Social8",
    description: "Give members a branded community app with your identity, content, groups, events, competitions and rewards.",
    eyebrow: "Your app experience",
    hero: "Put your branded community in every member's pocket.",
    intro: "Social8 provides the foundation for a consistent branded web and mobile member experience. Give your audience a familiar place to connect, follow activity, join groups and access rewards.",
    benefits: ["Branded member-facing web and mobile experience", "Your logo, colours and community identity", "Content, groups, messages and notifications", "Events, competitions and live quizzes", "Member points, wallets and rewards", "Enterprise customisation and integration options"],
    points: [{ title: "Stay recognisable", text: "Keep your organisation's identity at the centre of the member experience." }, { title: "Make participation easy", text: "Give members a convenient way to stay connected and act wherever they are." }, { title: "Keep improving", text: "Use the wider Social8 platform to add engagement, rewards and community features over time." }],
    image: mobileAppImage,
    imageAlt: "Social8 white-label community app across mobile and web",
    icon: Smartphone,
    related: [{ label: "White-label community platform", href: "/white-label/white-label-community-platform" }, { label: "Community app", href: "/community-app" }, { label: "Community rewards", href: "/rewards/community-rewards" }],
  },
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
  const page = pages[location] || pages["/community-platform"];
  const PageIcon = page.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageSEO({ title: page.metaTitle, description: page.description, url: location, image: page.image });
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
                <img src={page.image} alt={page.imageAlt} className="relative w-full rounded-2xl border shadow-xl" />
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