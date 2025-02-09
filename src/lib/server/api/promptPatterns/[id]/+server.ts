import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { promptPatterns } from "$lib/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, params.id))
    .get();

  if (!pattern) {
    return json({ error: "Prompt pattern not found" }, { status: 404 });
  }

  return json(pattern);
}
