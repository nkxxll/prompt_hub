import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { fail, json, type RequestEvent } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export async function PATCH(event: RequestEvent) {
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
