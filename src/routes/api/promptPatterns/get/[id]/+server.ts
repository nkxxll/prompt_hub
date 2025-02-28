import { redirect, json, type RequestEvent } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }
  const params = event.params;

  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, parseInt(params.id!, 10)))
    .get();

  if (!pattern) {
    return json({ error: "Prompt pattern not found" }, { status: 404 });
  }

  return json(pattern);
}
