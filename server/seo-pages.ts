import { seoLandingPages, type LandingPage } from "@shared/seo-pages";

type SeoPage = {
  title: string;
  description: string;
};

const resourcePage: SeoPage = {
  title: "Resources & Community Insights | Social8",
  description: "Explore Social8 insights on community building, member engagement, events, rewards and growing a successful online community.",
};
export const seoPages: Record<string, SeoPage> = {
  ...Object.fromEntries(
    Object.entries(seoLandingPages).map(([pathname, page]) => [
      pathname,
      { title: page.metaTitle, description: page.description },
    ]),
  ),
  "/resources": resourcePage,
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
  const landingPage = seoLandingPages[pathname];
  const staticContent = landingPage
    ? renderSeoLandingContent(landingPage)
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
    .replace("</head>", `    <script id="route-webpage-schema" type="application/ld+json">${webPageSchema}</script>\n  </head>`)
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
