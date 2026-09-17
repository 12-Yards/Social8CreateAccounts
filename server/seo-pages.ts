import { seoLandingPages, type LandingPage } from "@shared/seo-pages";

type SeoPage = {
  title: string;
  description: string;
};

const resourcePage: SeoPage = {
  title: "Resources & Community Insights | Social8",
  description: "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.",
};
const regionalPartnerPage: SeoPage = {
  title: "Become a Social8 Regional Partner | Build Recurring Income",
  description: "Build a portfolio of communities in your region with Social8. Introduce organisations to their own community platform and earn recurring revenue as your network grows.",
};
const faqPage: SeoPage = {
  title: "Frequently Asked Questions | Social8",
  description: "Find answers about Social8, the all-in-one community platform for clubs, organisations, charities, creators and membership communities.",
};
const climatePositivePage: SeoPage = {
  title: "Climate Positive Communities | Social8",
  description: "See how Social8 communities can support tree planting, ocean clean-up, biodiversity projects and charitable giving through everyday engagement.",
};
const deleteAccountPage: SeoPage = {
  title: "Delete Your Social8 Account | Social8",
  description: "Learn how to permanently delete your Social8 account from the app or request account deletion if you can no longer sign in.",
};
const vendorsPage: SeoPage = {
  title: "Social8 Vendors | Sign Up, Sign In & Manage Your Account",
  description: "Become a Social8 vendor, sign in to your vendor account, or access your dashboard to manage listings and redemptions.",
};
export const seoPages: Record<string, SeoPage> = {
  ...Object.fromEntries(
    Object.entries(seoLandingPages).map(([pathname, page]) => [
      pathname,
      { title: page.metaTitle, description: page.description },
    ]),
  ),
  "/resources": resourcePage,
  "/regional-partner": regionalPartnerPage,
  "/faq": faqPage,
  "/climate-positive": climatePositivePage,
  "/delete-account": deleteAccountPage,
  "/vendors": vendorsPage,
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderInternalLink(link: { label: string; href: string }) {
  return `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
}

export function injectRouteSeo(html: string, pathname: string) {
  const page = seoPages[pathname];
  if (!page) return html;

  const canonical = `https://social8.app${pathname}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
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
  const faqSchema = pathname === "/faq"
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          ["What is Social8?", "Social8 is an all-in-one platform for creating, managing and growing an online community."],
          ["Who is Social8 for?", "Social8 is designed for clubs, grassroots organisations, charities, societies, content creators and other organisations."],
          ["Do I need technical knowledge to set up Social8?", "No. Social8 has been designed so community owners can create and manage their platform without technical knowledge or developers."],
          ["How quickly can I launch a community?", "You can create your account, configure your community and start inviting members in less than an hour."],
          ["What can members do on Social8?", "Members can connect, join groups, message, comment, participate in events and competitions, respond to polls and take part in community activities."],
          ["Is Social8 free?", "The Professional plan is free and includes the core tools needed to build and manage your community."],
        ].map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      }).replaceAll("<", "\\u003c")
    : "";
  const landingPage = seoLandingPages[pathname];
  const staticContent = landingPage
    ? renderSeoLandingContent(landingPage)
    : pathname === "/regional-partner"
      ? renderRegionalPartnerContent()
      : pathname === "/faq"
        ? renderFaqContent()
        : pathname === "/climate-positive"
          ? renderClimatePositiveContent()
      : "";

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
    .replace("</head>", `    <script id="route-webpage-schema" type="application/ld+json">${webPageSchema}</script>${faqSchema ? `\n    <script id="route-faq-schema" type="application/ld+json">${faqSchema}</script>` : ""}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
}

export function renderSeoLandingContent(page: LandingPage) {
  const benefits = page.benefits
    .map((benefit) => `<li>${escapeHtml(benefit)}</li>`)
    .join("");
  const points = page.points
    .map(
      (point) =>
        `<article><h2>${escapeHtml(point.title)}</h2><p>${escapeHtml(point.text)}</p></article>`,
    )
    .join("");
  const related = page.related
    .map(renderInternalLink)
    .join(" ");

  return `
    <header>
      <a href="/">Social8</a>
      <nav aria-label="Primary navigation">
        <a href="/community-platform">Platform</a>
        <a href="/sports">Sports</a>
        <a href="/charities">Charities</a>
        <a href="/membership">Membership</a>
        <a href="/rewards">Rewards</a>
        <a href="/resources">Resources</a>
      </nav>
      <a href="/create-account">Create Account</a>
    </header>
    <main>
      <section>
        <p>${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.hero)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <p><a href="/create-account">Go Live Now</a> <a href="/contact">Talk to our team</a></p>
      </section>
      <section>
        <h2>Everything you need to build participation</h2>
        <p>${escapeHtml(page.description)}</p>
        <ul>${benefits}</ul>
      </section>
      <section>${points}</section>
      <section>
        <h2>Explore more from Social8</h2>
        <nav aria-label="Related pages">${related}</nav>
        <h2>Ready to build your community?</h2>
        <p>Launch your Social8 community and start bringing people together.</p>
        <a href="/create-account">Go Live Now</a>
      </section>
    </main>
  `;
}

function renderRegionalPartnerContent() {
  const sectors = [
    "Sports clubs and fan communities",
    "Charities and fundraising organisations",
    "Businesses and professional networks",
    "Education and student communities",
    "Events and entertainment",
    "Membership organisations",
    "Environmental and local community groups",
    "Hobby and interest groups",
  ];
  const steps = [
    ["Choose your territory", "Work with Social8 to agree a region or territory where you'll focus your activity."],
    ["Find communities", "Identify organisations, businesses and groups that could benefit from their own Social8 community."],
    ["Launch communities", "Introduce them to Social8 and help them get their community up and running."],
    ["Grow your network", "Continue adding communities and helping them grow and engage their members."],
    ["Earn from your network", "Receive an ongoing share of eligible revenue generated by the communities within your portfolio."],
  ];

  return `
    <header>
      <a href="/">Social8</a>
      <nav aria-label="Primary navigation">
        <a href="/#vision">Our Vision</a>
        <a href="/#features">Features</a>
        <a href="/#pricing">Pricing</a>
        <a href="/resources">Resources</a>
      </nav>
      <a href="/create-account">Create Account</a>
    </header>
    <main>
      <section>
        <p>Social8 Regional Partner Programme</p>
        <h1>Become a Social8 Regional Partner</h1>
        <h2>Build your regional network. Create recurring income.</h2>
        <p>Social8 is looking for ambitious partners to help grow communities across defined regions. Introduce Social8 to organisations in your area and build a portfolio that grows with your network.</p>
        <p><a href="/contact?type=regional-partner">Apply to Become a Regional Partner</a></p>
      </section>
      <section>
        <h2>What is a Social8 Regional Partner?</h2>
        <p>A Regional Partner is responsible for growing the Social8 network within an agreed territory. You identify organisations that could benefit from their own community platform, introduce them to Social8 and help them get started.</p>
        <p>Social8 provides the technology, infrastructure and ongoing platform support. You focus on relationships and growth.</p>
        <h2>You could work with</h2>
        <ul>${sectors.map((sector) => `<li>${escapeHtml(sector)}</li>`).join("")}</ul>
      </section>
      <section>
        <h2>A different kind of partnership</h2>
        <p>You're not just earning commission on a sale. With Social8, the opportunity is to build a portfolio of communities. As the communities within your network generate revenue, you can receive an ongoing share of that revenue.</p>
        <h2>Build once. Grow continuously.</h2>
      </section>
      <section>
        <h2>How it works</h2>
        <ol>${steps.map(([title, text]) => `<li><strong>${escapeHtml(title)}</strong> — ${escapeHtml(text)}</li>`).join("")}</ol>
      </section>
      <section>
        <h2>Your earning potential grows with your network</h2>
        <ul>
          <li><strong>10 Communities</strong> — A starting portfolio</li>
          <li><strong>25 Communities</strong> — A growing regional business</li>
          <li><strong>50+ Communities</strong> — A substantial recurring revenue opportunity</li>
        </ul>
        <p>The exact commercial terms will depend on your territory, partnership structure and the communities you develop. There is no fixed ceiling on the size of your network.</p>
      </section>
      <section>
        <h2>Social8 does the heavy lifting</h2>
        <p>You don't need to build or maintain the technology. Social8 provides the platform, infrastructure, features and ongoing support.</p>
        <h2>Who are we looking for?</h2>
        <p>People with strong regional or sector connections who enjoy building relationships, understand local organisations and want to build a long-term recurring income opportunity.</p>
        <p>You don't need to be a technology expert. You need to know people, understand opportunities and be able to open doors.</p>
      </section>
      <section>
        <h2>Ready to build your region?</h2>
        <p>Turn your local network into a long-term business opportunity. We're looking for Regional Partners who want to help bring Social8 to new communities and share in the growth.</p>
        <p><a href="/contact?type=regional-partner">Apply to Become a Regional Partner</a></p>
        <p>Already have a region or network in mind? Tell us about it.</p>
      </section>
    </main>
  `;
}

function renderFaqContent() {
  const questions = [
    ["What is Social8?", "Social8 is an all-in-one platform for creating, managing and growing an online community."],
    ["Who is Social8 for?", "Social8 is designed for clubs, grassroots organisations, charities, societies, content creators and other organisations."],
    ["Do I need technical knowledge to set up Social8?", "No. Social8 has been designed so community owners can create and manage their platform without technical knowledge or developers."],
    ["How quickly can I launch a community?", "You can create your account, configure your community and start inviting members in less than an hour."],
    ["What can members do on Social8?", "Members can connect, join groups, message, comment, participate in events and competitions, respond to polls and take part in community activities."],
    ["Is Social8 free?", "The Professional plan is free and includes the core tools needed to build and manage your community."],
  ];
  return `
    <main>
      <section><p>Social8 FAQs</p><h1>Frequently Asked Questions</h1><p>Everything you need to know about building your community with Social8.</p></section>
      <section><h2>Questions about Social8</h2><dl>${questions.map(([question, answer]) => `<dt><strong>${escapeHtml(question)}</strong></dt><dd>${escapeHtml(answer)}</dd>`).join("")}</dl><p><a href="/create-account">Build Your Community</a></p></section>
    </main>
  `;
}

function renderClimatePositiveContent() {
  const initiatives = ["Tree planting", "Ocean clean-up", "Biodiversity projects", "Charitable giving"];
  return `
    <main>
      <section><p>Climate Positive</p><h1>Community Powered. Planet Focused.</h1><p>Social8 communities don't just connect people—they can create real environmental impact through everyday engagement, while keeping community participation at the centre.</p></section>
      <section><h2>Positive action through participation</h2><ul>${initiatives.map((initiative) => `<li>${escapeHtml(initiative)}</li>`).join("")}</ul><p>Environmental action is an optional part of the wider Social8 rewards and marketplace experience.</p><p><a href="/rewards/community-rewards">Explore Community Rewards</a></p></section>
    </main>
  `;
}
