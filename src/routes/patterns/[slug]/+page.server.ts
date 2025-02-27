import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load = async ({ params }: {params: any} ) => {
  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, params.slug))
    .get();
  return { pattern };
};
