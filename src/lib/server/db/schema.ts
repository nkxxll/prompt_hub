import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Clerk provides a unique string-based user ID
  email: text("email").notNull().unique(), // Clerk ensures unique emails
  username: text("username").unique(), // Optional if you allow usernames
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

export const promptPatterns = sqliteTable("prompt_patterns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  formatString: text("format_string").notNull(), // The format string with placeholders
  llmWebsite: text("llm_website"), // Optional mapping to an LLM provider
  notes: text("notes"), // Optional notes about the prompt
  category: text("category"), // Category for organization
  usageCount: integer("usage_count").default(0), // Track how often a prompt is used
  public: integer("public", {mode: "boolean"}),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }), // If multi-user
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});
