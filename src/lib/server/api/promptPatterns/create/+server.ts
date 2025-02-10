import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { json, type RequestEvent } from "@sveltejs/kit";

type PromptPattern = typeof promptPatterns.$inferInsert;

export async function POST(event: RequestEvent) {
  const request = event.request;
  const pattern: PromptPattern = await request.json();

  const [createdPattern] = await db
    .insert(promptPatterns).values(pattern).returning();

  if (!createdPattern) {
    return json({ error: "Prompt pattern not created" }, { status: 500 });
  }

  return json(createdPattern);
}
