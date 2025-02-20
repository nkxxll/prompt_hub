import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";
import { eq } from "drizzle-orm";

export const load: PageLoad = async ({ params }) => {
  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, params.slug))
    .get();
  return { pattern };
};
