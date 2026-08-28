type SeoPage = {
  title: string;
  description: string;
};

export const seoPages: Record<string, SeoPage> = {
  "/community-platform": {
    title: "Community Platform for Clubs, Organisations & Creators | Social8",
    description: "Build a branded online community with members, content, events, groups, rewards and everything you need to grow participation.",
  },
  "/community-management-software": {
    title: "Community Management Software for Modern Organisations | Social8",
    description: "Manage members, content, events, groups, competitions and rewards with Social8 community management software.",
  },
  "/community-app": {
    title: "Community App for Members, Clubs & Organisations | Social8",
    description: "Give members a dedicated community app and web experience for content, groups, events, competitions, messaging and rewards.",
  },
  "/sports": {
    title: "Sports Community Platform for Clubs & Supporters | Social8",
    description: "Build a stronger sports community with member profiles, fixtures, events, competitions, fan engagement, rewards and groups.",
  },
  "/sports/sports-community-platform": {
    title: "Sports Community Platform for Clubs & Sporting Organisations | Social8",
    description: "A dedicated sports community platform for clubs and sporting organisations to manage members, events, competitions and engagement.",
  },
  "/sports/sports-fan-engagement": {
    title: "Sports Fan Engagement Platform for Clubs & Supporters | Social8",
    description: "Engage sports fans between matches with content, groups, live quizzes, competitions, points, rewards and community experiences.",
  },
  "/sports/football-community-platform": {
    title: "Football Community Platform for Clubs, Fans & Members | Social8",
    description: "Connect football clubs, supporters and members with a branded community platform for content, fixtures, competitions and rewards.",
  },
  "/charities": {
    title: "Charity Community Platform for Supporters & Fundraisers | Social8",
    description: "Build an engaged charity community with supporter groups, campaigns, events, content, rewards and meaningful participation.",
  },
  "/charities/charity-community-platform": {
    title: "Charity Community Platform for Supporters, Volunteers & Fundraisers | Social8",
    description: "A dedicated charity community platform for supporter engagement, fundraising activity, events, content and campaigns.",
  },
  "/charities/charity-engagement-platform": {
    title: "Charity Engagement Platform for Supporter Participation | Social8",
    description: "Increase charity engagement with content, groups, events, petitions, quizzes, points and rewards on Social8.",
  },
  "/membership": {
    title: "Membership Community Platform for Clubs & Organisations | Social8",
    description: "Build a stronger membership community with profiles, groups, content, events, competitions, rewards and member management.",
  },
  "/membership/membership-community-platform": {
    title: "Membership Community Platform for Clubs, Societies & Organisations | Social8",
    description: "A membership community platform for clubs and organisations to connect members, manage activity and grow participation.",
  },
  "/membership/membership-engagement": {
    title: "Membership Engagement Platform for Clubs & Societies | Social8",
    description: "Increase membership engagement with groups, content, events, competitions, polls, messaging and rewards.",
  },
  "/rewards": {
    title: "Community Rewards Platform for Points, Gift Cards & More | Social8",
    description: "Reward community participation with points that can be converted to withdrawable currency, gift cards, crypto and positive actions.",
  },
  "/rewards/community-rewards": {
    title: "Community Rewards System for Member Engagement | Social8",
    description: "Build a rewards system that gives community members points for participation and real-value ways to redeem them.",
  },
  "/rewards/community-gamification": {
    title: "Community Gamification Platform with Points & Leaderboards | Social8",
    description: "Increase community participation with configurable points, live quizzes, competitions, leaderboards and real-value rewards.",
  },
  "/white-label": {
    title: "White-Label Community Platform for Organisations | Social8",
    description: "Launch a fully branded, white-label community platform with your own identity, member experience, domain, API and integrations.",
  },
  "/white-label/white-label-community-platform": {
    title: "White-Label Community Platform with Your Own Branding | Social8",
    description: "Launch a community platform under your own brand with custom identity, content, domains, member management and Enterprise integrations.",
  },
  "/white-label/white-label-community-app": {
    title: "White-Label Community App for Your Organisation | Social8",
    description: "Give members a branded community app with your identity, content, groups, events, competitions and rewards.",
  },
  "/resources": {
    title: "Resources & Community Insights | Social8",
    description: "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.",
  },
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function injectRouteSeo(html: string, pathname: string) {
  const page = seoPages[pathname];
  if (!page) return html;

  const canonical = `https://social8.app${pathname}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const heading = escapeHtml(page.title.replace(/\s\|\sSocial8$/, ""));
  const staticBenefits = [
    "Connect members in one branded community",
    "Manage content, groups, events and competitions",
    "Encourage participation with points and rewards",
    "Give members a clear web and mobile experience",
  ];
  const staticLinks = [
    { href: "/community-platform", label: "Community platform" },
    { href: "/community-management-software", label: "Community management software" },
    { href: "/resources", label: "Resources" },
  ];
  const crawlerContent = `
    <main data-seo-prerendered="true">
      <article>
        <p>Social8</p>
        <h1>${heading}</h1>
        <p>${description}</p>
        <h2>How Social8 helps</h2>
        <ul>${staticBenefits.map((benefit) => `<li>${benefit}</li>`).join("")}</ul>
        <nav aria-label="Related Social8 pages">
          ${staticLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join(" ")}
        </nav>
      </article>
    </main>`;
  const webPageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Social8",
      url: "https://social8.app",
    },
  }).replaceAll("<", "\\u003c");

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/\s*<script id="homepage-faq-schema" type="application\/ld\+json">[\s\S]*?<\/script>/, "")
    .replace("</head>", `    <script id="route-webpage-schema" type="application/ld+json">${webPageSchema}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${crawlerContent}</div>`);
}