import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { redirect, json, type RequestEvent } from "@sveltejs/kit";

type PromptPattern = typeof promptPatterns.$inferInsert;

export async function POST(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const request = event.request;
  const pattern: PromptPattern = await request.json();

  const [createdPattern] = await db
    .insert(promptPatterns).values(pattern).returning();

  if (!createdPattern) {
    return json({ error: "Prompt pattern not created" }, { status: 500 });
  }

  return json(createdPattern);
}
