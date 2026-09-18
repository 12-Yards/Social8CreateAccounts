import { storage } from "./storage";

const SORO_EMBED_URL =
  "https://app.trysoro.com/api/embed/f374b416-5193-4d7a-9a7b-3665a1fcfe60";
const SORO_API_BASE = "https://app.trysoro.com";
const SORO_TOKEN = "f374b416-5193-4d7a-9a7b-3665a1fcfe60";
const IMPORT_CUTOFF_DATE = "2026-09-30";
const CHECK_INTERVAL_MS = 60 * 60 * 1000;

type SoroArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  isoDate: string;
  image?: string | null;
};

let activeImport: Promise<void> | null = null;

function londonDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function cleanArticleHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript\s*:/gi, "");
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(20_000),
    headers: { Accept: "text/javascript, application/json" },
  });
  if (!response.ok) {
    throw new Error(`Trysoro request failed with ${response.status} for ${url}`);
  }
  return response.text();
}

function parseArticles(script: string): SoroArticle[] {
  const match = script.match(/var SORO_ARTICLES = (\[[\s\S]*?\]);\s*var SORO_TOKEN/);
  if (!match) {
    throw new Error("Trysoro embed did not contain an article list");
  }

  const parsed: unknown = JSON.parse(match[1]);
  if (!Array.isArray(parsed)) {
    throw new Error("Trysoro article list was not an array");
  }

  return parsed.filter((article): article is SoroArticle => {
    if (!article || typeof article !== "object") return false;
    const value = article as Partial<SoroArticle>;
    return (
      typeof value.id === "string" &&
      typeof value.title === "string" &&
      typeof value.slug === "string" &&
      typeof value.isoDate === "string" &&
      !Number.isNaN(Date.parse(value.isoDate))
    );
  });
}

async function fetchArticleContent(articleId: string): Promise<string> {
  const response = await fetch(
    `${SORO_API_BASE}/api/embed/${SORO_TOKEN}/article/${encodeURIComponent(articleId)}`,
    {
      signal: AbortSignal.timeout(20_000),
      headers: { Accept: "application/json" },
    },
  );
  if (!response.ok) {
    throw new Error(`Trysoro article content failed with ${response.status}`);
  }

  const data = (await response.json()) as { content?: unknown };
  return typeof data.content === "string" ? cleanArticleHtml(data.content) : "";
}

async function fetchArticleImage(imageUrl: string | null | undefined): Promise<{ data: string; mimeType: string } | null> {
  if (!imageUrl) return null;

  try {
    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(20_000) });
    if (!response.ok) return null;

    const contentType = response.headers.get("content-type")?.split(";")[0]?.trim() || "image/webp";
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024 || !contentType.startsWith("image/")) {
      return null;
    }

    return { data: bytes.toString("base64"), mimeType: contentType };
  } catch {
    return null;
  }
}

async function importNewsIfDue(): Promise<void> {
  const today = londonDate();
  if (today > IMPORT_CUTOFF_DATE) {
    return;
  }

  const state = await storage.getNewsSyncState();
  if (state?.lastCheckedDate === today) {
    return;
  }

  try {
    const articles = parseArticles(await fetchText(SORO_EMBED_URL));
    let imported = 0;

    for (const article of articles) {
      if (await storage.getNewsArticleBySourceId(article.id)) {
        continue;
      }

      let content: string;
      try {
        content = await fetchArticleContent(article.id);
      } catch (error) {
        console.error(`Skipping Trysoro article ${article.id}:`, error);
        continue;
      }

      const image = await fetchArticleImage(article.image);
      await storage.createNewsArticle({
        sourceId: article.id,
        title: article.title.trim(),
        slug: article.slug.trim(),
        excerpt: article.excerpt?.trim() || "",
        content,
        imageData: image?.data || null,
        imageMimeType: image?.mimeType || null,
        publishedAt: new Date(article.isoDate),
      });
      imported += 1;
    }

    await storage.updateNewsSyncState(today);
    console.log(`Trysoro news sync completed for ${today}: imported ${imported} new articles`);
  } catch (error) {
    console.error("Trysoro news sync failed:", error);
  }
}

export function runNewsImportIfDue(): Promise<void> {
  if (!activeImport) {
    activeImport = importNewsIfDue().finally(() => {
      activeImport = null;
    });
  }
  return activeImport;
}

export function startNewsSync(): void {
  void runNewsImportIfDue();

  const timer = setInterval(() => {
    void runNewsImportIfDue();
  }, CHECK_INTERVAL_MS);
  timer.unref?.();
}