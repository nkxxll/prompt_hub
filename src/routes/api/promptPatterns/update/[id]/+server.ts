import { db } from "$lib/server/db";
import { type UpdatePattern } from "$lib/server/prompt";
import { promptPatterns } from "$lib/server/db/schema";
import { redirect, json, type RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function PATCH(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const params = event.params;
  const request = event.request;
  const pattern: UpdatePattern = await request.json();

  if (!params.id) {
    return json({ error: "Prompt pattern not found" }, { status: 404 });
  }

  const [updatedPattern] = await db
    .update(promptPatterns)
    .set(pattern)
    .where(eq(promptPatterns.id, parseInt(params.id, 10)))
    .returning();

  if (!updatedPattern) {
    return json({ error: "Prompt pattern not found" }, { status: 404 });
  }

  return json(updatedPattern);
}
