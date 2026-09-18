import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  orgName: text("org_name").notNull(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  hasDomain: text("has_domain"),
  domainName: text("domain_name"),
  subdomain: text("subdomain"),
  noDomainPrefix: text("no_domain_prefix"),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  platformUrl: text("platform_url"),
  adminUrl: text("admin_url"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  organisation: text("organisation"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile"),
  notes: text("notes"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  sourceId: text("source_id").notNull().unique(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  imageData: text("image_data"),
  imageMimeType: text("image_mime_type"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = typeof newsArticles.$inferInsert;

export const newsSyncState = pgTable("news_sync_state", {
  id: integer("id").primaryKey(),
  lastCheckedDate: text("last_checked_date"),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
});

export type NewsSyncState = typeof newsSyncState.$inferSelect;
