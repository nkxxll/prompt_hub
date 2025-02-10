/** search with params like name or category or user */
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { json, type RequestEvent } from "@sveltejs/kit";
import { like } from "drizzle-orm";

export async function GET(event: RequestEvent) {
  const url = event.url;
  const name = url.searchParams.get("name") || "";
  const llmWebsite = url.searchParams.get("llmWebsite") || "";
  const formatString = url.searchParams.get("formatString") || "";
  const notes = url.searchParams.get("notes") || "";
  let byName: (typeof promptPatterns.$inferSelect)[] = [];
  let byLlmWebsite: (typeof promptPatterns.$inferSelect)[] = [];
  let byFormatString: (typeof promptPatterns.$inferSelect)[] = [];
  let byNotes: (typeof promptPatterns.$inferSelect)[] = [];

  if (name != "") {
    byName = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${name}%`))
      .all();
  }

  if (name != "") {
    byLlmWebsite = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${llmWebsite}%`))
      .all();
  }

  if (name != "") {
    byFormatString = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${formatString}%`))
      .all();
  }

  if (name != "") {
    byNotes = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${notes}%`))
      .all();
  }

  return json([...byName, ...byLlmWebsite, ...byFormatString, ...byNotes]);
}
