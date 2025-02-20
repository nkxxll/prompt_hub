import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const patterns = await db.select().from(promptPatterns).all();
  return { patterns };
};
