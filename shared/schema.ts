import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Chat messages for storing chat history
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  type: text("type", { enum: ["user", "bot"] }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Knowledge base articles for legal information
export const knowledgeArticles = pgTable("knowledge_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  isPublished: boolean("is_published").default(true),
});

// Document analysis
export const documentAnalysis = pgTable("document_analysis", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  analysisResult: text("analysis_result").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Legal templates
export const legalTemplates = pgTable("legal_templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array(),
});

// Case law database
export const caseLaw = pgTable("case_law", {
  id: serial("id").primaryKey(),
  caseTitle: text("case_title").notNull(),
  court: text("court").notNull(),
  year: integer("year").notNull(),
  citation: text("citation").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  keyPoints: text("key_points").array(),
});

// State law guides
export const stateLawGuides = pgTable("state_law_guides", {
  id: serial("id").primaryKey(),
  state: text("state").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// User feedback
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["positive", "negative", "text"] }).notNull(),
  content: text("content"), // For text feedback
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"), // Optional browser info
});

// Schema definitions
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export const insertKnowledgeArticleSchema = createInsertSchema(knowledgeArticles).omit({
  id: true,
});

export const insertDocumentAnalysisSchema = createInsertSchema(documentAnalysis).omit({
  id: true,
  timestamp: true,
});

export const insertLegalTemplateSchema = createInsertSchema(legalTemplates).omit({
  id: true,
});

export const insertCaseLawSchema = createInsertSchema(caseLaw).omit({
  id: true,
});

export const insertStateLawGuideSchema = createInsertSchema(stateLawGuides).omit({
  id: true,
  lastUpdated: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type KnowledgeArticle = typeof knowledgeArticles.$inferSelect;
export type InsertKnowledgeArticle = z.infer<typeof insertKnowledgeArticleSchema>;

export type DocumentAnalysis = typeof documentAnalysis.$inferSelect;
export type InsertDocumentAnalysis = z.infer<typeof insertDocumentAnalysisSchema>;

export type LegalTemplate = typeof legalTemplates.$inferSelect;
export type InsertLegalTemplate = z.infer<typeof insertLegalTemplateSchema>;

export type CaseLaw = typeof caseLaw.$inferSelect;
export type InsertCaseLaw = z.infer<typeof insertCaseLawSchema>;

export type StateLawGuide = typeof stateLawGuides.$inferSelect;
export type InsertStateLawGuide = z.infer<typeof insertStateLawGuideSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
