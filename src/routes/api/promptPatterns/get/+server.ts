/** search with params like name or category or user */
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { redirect, json, type RequestEvent } from "@sveltejs/kit";
import { like } from "drizzle-orm";

export async function GET(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const url = event.url;
  const name = url.searchParams.get("name") || "";
  const llmWebsite = url.searchParams.get("llmWebsite") || "";
  const formatString = url.searchParams.get("formatString") || "";
  const notes = url.searchParams.get("notes") || "";
  let byName: (typeof promptPatterns.$inferSelect)[] = [];
  let byLlmWebsite: (typeof promptPatterns.$inferSelect)[] = [];
  let byFormatString: (typeof promptPatterns.$inferSelect)[] = [];
  let byNotes: (typeof promptPatterns.$inferSelect)[] = [];

  if (name === "" && llmWebsite === "" && formatString === "" && notes === "") {
    const res = await db.select().from(promptPatterns).all();
    return json(res);
  }

  if (name !== "") {
    byName = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${name}%`))
      .all();
  }

  if (llmWebsite !== "") {
    byLlmWebsite = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${llmWebsite}%`))
      .all();
  }

  if (formatString !== "") {
    byFormatString = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${formatString}%`))
      .all();
  }

  if (notes !== "") {
    byNotes = await db
      .select()
      .from(promptPatterns)
      .where(like(promptPatterns.name, `%${notes}%`))
      .all();
  }

  return json([...byName, ...byLlmWebsite, ...byFormatString, ...byNotes]);
}
