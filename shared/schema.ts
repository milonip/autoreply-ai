import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Reply generation schemas
export const replyRequestSchema = z.object({
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
  tone: z.enum(["friendly", "professional", "empathetic", "blunt"], {
    required_error: "Tone is required",
  }),
  provider: z.enum(["openai", "groq", "ollama", "demo"]).optional().default("groq"),
});

export const replySchema = z.object({
  text: z.string(),
  tone: z.string(),
});

export const replyResponseSchema = z.object({
  replies: z.array(replySchema),
});

export type ReplyRequest = z.infer<typeof replyRequestSchema>;
export type Reply = z.infer<typeof replySchema>;
export type ReplyResponse = z.infer<typeof replyResponseSchema>;
