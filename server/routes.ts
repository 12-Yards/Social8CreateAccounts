import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema, insertContactSchema } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import pg from "pg";
import { execSync } from "child_process";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const PgStore = connectPg(session);
const sessionPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function ensureSessionTable() {
  const client = await sessionPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
      );
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
  } finally {
    client.release();
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).isAdmin) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await ensureSessionTable();
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    app.set("trust proxy", 1);
  }
  app.use(
    session({
      store: new PgStore({ pool: sessionPool, createTableIfMissing: false }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isProduction,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.post("/api/registrations", async (req: Request, res: Response) => {
    const parsed = insertRegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    }
    const registration = await storage.createRegistration(parsed.data);
    return res.status(201).json(registration);
  });

  app.get("/sitemap.xml", (_req: Request, res: Response) => {
    const baseUrl = "https://social8.app";
    const pages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/create-account", priority: "0.9", changefreq: "monthly" },
      { loc: "/contact", priority: "0.8", changefreq: "monthly" },
      { loc: "/terms", priority: "0.5", changefreq: "yearly" },
      { loc: "/privacy", priority: "0.5", changefreq: "yearly" },
      { loc: "/features/multi-tenancy", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/zero-friction-signup", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/self-management", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/community-content", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/events-competitions", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/live-quizzes", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/points-leaderboards", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/redeem-points", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/prize-auctions", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/members-networking", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/monetisation", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/marketplace", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/website-mobile-app", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/fully-supported", priority: "0.8", changefreq: "monthly" },
      { loc: "/features/technology-architecture", priority: "0.8", changefreq: "monthly" },
    ];
    const today = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/robots.txt", (_req: Request, res: Response) => {
    const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/login
Disallow: /api/

Sitemap: https://social8.app/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(txt);
  });

  app.post("/api/contacts", async (req: Request, res: Response) => {
    const parsed = insertContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
    }
    const contact = await storage.createContact(parsed.data);
    return res.status(201).json(contact);
  });

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (ADMIN_PASSWORD && username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      (req.session as any).isAdmin = true;
      return res.json({ success: true });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req: Request, res: Response) => {
    if (req.session && (req.session as any).isAdmin) {
      return res.json({ isAdmin: true });
    }
    return res.status(401).json({ message: "Not authenticated" });
  });

  app.get("/api/admin/registrations", requireAdmin, async (_req: Request, res: Response) => {
    const registrations = await storage.getRegistrations();
    return res.json(registrations);
  });

  app.get("/api/admin/registrations/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const registration = await storage.getRegistration(id);
    if (!registration) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(registration);
  });

  app.patch("/api/admin/registrations/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const { platformUrl, adminUrl } = req.body;
    const updated = await storage.updateRegistration(id, {
      ...(platformUrl !== undefined && { platformUrl }),
      ...(adminUrl !== undefined && { adminUrl }),
    });
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updated);
  });

  app.post("/api/check-email", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const exists = await storage.checkEmailExists(email.trim().toLowerCase());
    return res.json({ exists });
  });

  app.post("/api/check-domain", async (req: Request, res: Response) => {
    const { domainName } = req.body;
    if (!domainName) {
      return res.status(400).json({ message: "Domain name is required" });
    }
    const exists = await storage.checkDomainExists(domainName.trim().toLowerCase());
    return res.json({ exists });
  });

  app.delete("/api/admin/registrations/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const deleted = await storage.deleteRegistration(id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ success: true });
  });

  app.patch("/api/admin/registrations/:id/read", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const updated = await storage.markRegistrationRead(id);
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updated);
  });

  app.get("/api/admin/contacts", requireAdmin, async (_req: Request, res: Response) => {
    const contacts = await storage.getContacts();
    return res.json(contacts);
  });

  app.delete("/api/admin/contacts/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const deleted = await storage.deleteContact(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json({ message: "Contact deleted" });
  });

  app.patch("/api/admin/contacts/:id/read", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const updated = await storage.markContactRead(id);
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updated);
  });

  app.post("/api/admin/sync-github", requireAdmin, async (_req: Request, res: Response) => {
    try {
      const output = execSync("node script/sync-github.mjs", {
        cwd: process.cwd(),
        timeout: 60000,
        env: process.env as Record<string, string>,
      }).toString();
      return res.json({ success: true, output });
    } catch (err: any) {
      const output = err.stdout?.toString() || err.stderr?.toString() || err.message;
      return res.status(500).json({ success: false, output });
    }
  });

  app.post("/api/onboarding/create-tenant", async (req: Request, res: Response) => {
    const { name, domainName, subDomain, adminEmail, adminPassword, adminName } = req.body;

    if (!name || !adminEmail || !adminPassword || !adminName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const apiKey = process.env.ONBOARDING_API_KEY;
    const apiUrl = process.env.ONBOARDING_API_URL;

    if (!apiKey || !apiUrl) {
      return res.status(503).json({ message: "Onboarding API not configured" });
    }

    try {
      const response = await fetch(`${apiUrl}/api/onboarding/tenant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          name,
          domainName: domainName || undefined,
          subDomain: subDomain || undefined,
          adminEmail,
          adminPassword,
          adminName,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { error: text || "Unexpected response from platform server" };
      }

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(201).json({ ...data, success: true });
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.log("[TENANT ERROR]", errMsg);
      return res.status(500).json({ message: "Failed to create tenant. The platform server may be unavailable.", detail: errMsg });
    }
  });

  app.post("/api/onboarding/custom-domain-dns", async (req: Request, res: Response) => {
    const { domainName } = req.body;

    if (!domainName) {
      return res.status(400).json({ message: "Domain name is required" });
    }

    const apiKey = process.env.ONBOARDING_API_KEY;
    const apiUrl = process.env.ONBOARDING_API_URL;

    if (!apiKey || !apiUrl) {
      return res.status(503).json({ message: "Onboarding API not configured" });
    }

    try {
      const dnsAdminEmail = process.env.DNS_ADMIN_EMAIL;
      const dnsAdminPassword = process.env.DNS_ADMIN_PASSWORD;

      let sessionCookie = "";
      if (dnsAdminEmail && dnsAdminPassword) {
        try {
          const loginResponse = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: dnsAdminEmail, password: dnsAdminPassword }),
          });
          console.log("DNS login response status:", loginResponse.status);
          const setCookieHeader = loginResponse.headers.get("set-cookie");
          if (setCookieHeader) {
            sessionCookie = setCookieHeader.split(";")[0];
            console.log("DNS login got session cookie");
          } else {
            const loginData = await loginResponse.json().catch(() => ({}));
            if (loginData.token) {
              sessionCookie = `token=${loginData.token}`;
              console.log("DNS login got token from body");
            } else {
              console.log("DNS login failed:", JSON.stringify(loginData));
            }
          }
        } catch (loginErr) {
          console.error("DNS login error:", loginErr);
        }
      } else {
        console.log("DNS admin credentials not configured (DNS_ADMIN_EMAIL / DNS_ADMIN_PASSWORD)");
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
      if (sessionCookie) {
        headers["Cookie"] = sessionCookie;
      }

      const response = await fetch(`${apiUrl}/api/tenants/custom-domain/dns`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          domainName,
          applyNginx: true,
        }),
      });

      const responseText = await response.text();
      console.log("DNS endpoint response status:", response.status, "body:", responseText.substring(0, 500));
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { error: responseText || "Unexpected response from platform server" };
      }

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.json(data);
    } catch (err) {
      console.error("DNS API error:", err);
      return res.status(500).json({ message: "Failed to fetch DNS records" });
    }
  });

  app.get("/api/admin/contacts/:id", requireAdmin, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const contact = await storage.getContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(contact);
  });

  return httpServer;
}
