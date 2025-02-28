import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { redirect, fail, json, type RequestEvent } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export async function PATCH(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const params = event.params;

  if (!params.id) {
    return json({ error: "Prompt pattern not found" }, { status: 500 });
  }

  const [updatedPattern] = await db
    .update(promptPatterns)
    .set({
      usageCount: sql`${promptPatterns.usageCount} + 1`,
    })
    .where(eq(promptPatterns.id, parseInt(params.id, 10)))
    .returning();

  if (!updatedPattern) {
    return fail(500, { message: "Pattern not found" });
  }

  return { success: true, pattern: updatedPattern };
}
