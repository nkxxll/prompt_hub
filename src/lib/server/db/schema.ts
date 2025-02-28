import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const promptPatterns = sqliteTable("prompt_patterns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  formatString: text("format_string").notNull(), // The format string with placeholders
  llmWebsite: text("llm_website"), // Optional mapping to an LLM provider
  notes: text("notes"), // Optional notes about the prompt
  category: text("category"), // Category for organization
  usageCount: integer("usage_count").default(0), // Track how often a prompt is used
  public: integer("public", { mode: "boolean" }),
  userId: integer("user_id").references(() => user.id, { onDelete: "cascade" }), // If multi-user
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type PromptPattern = typeof promptPatterns.$inferSelect
