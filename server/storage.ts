import {
  type User, type InsertUser,
  type Registration, type InsertRegistration,
  type ContactSubmission, type InsertContact,
  type NewsArticle, type InsertNewsArticle, type NewsSyncState,
  users, registrations, contactSubmissions, newsArticles, newsSyncState,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, or, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRegistration(reg: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  getRegistration(id: number): Promise<Registration | undefined>;
  updateRegistration(id: number, data: Partial<InsertRegistration>): Promise<Registration | undefined>;
  createContact(contact: InsertContact): Promise<ContactSubmission>;
  getContacts(): Promise<ContactSubmission[]>;
  getRegionalPartnerApplications(offset: number, limit: number): Promise<{ applications: ContactSubmission[]; total: number }>;
  getContact(id: number): Promise<ContactSubmission | undefined>;
  checkDomainExists(domainName: string): Promise<boolean>;
  checkEmailExists(email: string): Promise<boolean>;
  deleteRegistration(id: number): Promise<boolean>;
  deleteContact(id: number): Promise<boolean>;
  markRegistrationRead(id: number): Promise<Registration | undefined>;
  markContactRead(id: number): Promise<ContactSubmission | undefined>;
  getNewsArticles(): Promise<NewsArticle[]>;
  getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined>;
  getNewsArticleBySourceId(sourceId: string): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  getNewsSyncState(): Promise<NewsSyncState | undefined>;
  updateNewsSyncState(lastCheckedDate: string): Promise<NewsSyncState>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createRegistration(reg: InsertRegistration): Promise<Registration> {
    const [result] = await db.insert(registrations).values(reg).returning();
    return result;
  }

  async getRegistrations(): Promise<Registration[]> {
    return db.select().from(registrations).orderBy(desc(registrations.createdAt));
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    const [result] = await db.select().from(registrations).where(eq(registrations.id, id));
    return result;
  }

  async updateRegistration(id: number, data: Partial<InsertRegistration>): Promise<Registration | undefined> {
    const [result] = await db.update(registrations).set(data).where(eq(registrations.id, id)).returning();
    return result;
  }

  async createContact(contact: InsertContact): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(contact).returning();
    return result;
  }

  async getContacts(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getRegionalPartnerApplications(offset: number, limit: number): Promise<{ applications: ContactSubmission[]; total: number }> {
    const regionalPartnerFilter = like(contactSubmissions.notes, "Regional Partner Application%");
    const [applications, countResult] = await Promise.all([
      db.select()
        .from(contactSubmissions)
        .where(regionalPartnerFilter)
        .orderBy(desc(contactSubmissions.createdAt), desc(contactSubmissions.id))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` })
        .from(contactSubmissions)
        .where(regionalPartnerFilter),
    ]);

    return {
      applications,
      total: Number(countResult[0]?.count ?? 0),
    };
  }

  async getContact(id: number): Promise<ContactSubmission | undefined> {
    const [result] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const results = await db.select().from(registrations).where(eq(registrations.email, email));
    return results.length > 0;
  }

  async checkDomainExists(domainName: string): Promise<boolean> {
    const results = await db.select().from(registrations).where(
      or(
        eq(registrations.domainName, domainName),
        eq(registrations.noDomainPrefix, domainName)
      )
    );
    return results.length > 0;
  }

  async deleteRegistration(id: number): Promise<boolean> {
    const result = await db.delete(registrations).where(eq(registrations.id, id)).returning();
    return result.length > 0;
  }

  async deleteContact(id: number): Promise<boolean> {
    const [result] = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return !!result;
  }

  async markRegistrationRead(id: number): Promise<Registration | undefined> {
    const [result] = await db.update(registrations).set({ isRead: true }).where(eq(registrations.id, id)).returning();
    return result;
  }

  async markContactRead(id: number): Promise<ContactSubmission | undefined> {
    const [result] = await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id)).returning();
    return result;
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return db.select().from(newsArticles).orderBy(desc(newsArticles.publishedAt), desc(newsArticles.id));
  }

  async getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
    const [result] = await db.select().from(newsArticles).where(eq(newsArticles.slug, slug));
    return result;
  }

  async getNewsArticleBySourceId(sourceId: string): Promise<NewsArticle | undefined> {
    const [result] = await db.select().from(newsArticles).where(eq(newsArticles.sourceId, sourceId));
    return result;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [result] = await db.insert(newsArticles).values(article).onConflictDoNothing({ target: newsArticles.sourceId }).returning();
    if (result) {
      return result;
    }

    const existing = await this.getNewsArticleBySourceId(article.sourceId);
    if (!existing) {
      throw new Error(`News article ${article.sourceId} was not inserted`);
    }
    return existing;
  }

  async getNewsSyncState(): Promise<NewsSyncState | undefined> {
    const [result] = await db.select().from(newsSyncState).where(eq(newsSyncState.id, 1));
    return result;
  }

  async updateNewsSyncState(lastCheckedDate: string): Promise<NewsSyncState> {
    const [result] = await db
      .insert(newsSyncState)
      .values({ id: 1, lastCheckedDate, lastCheckedAt: new Date() })
      .onConflictDoUpdate({
        target: newsSyncState.id,
        set: { lastCheckedDate, lastCheckedAt: new Date() },
      })
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
