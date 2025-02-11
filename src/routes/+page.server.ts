import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const patterns = await db.select().from(promptPatterns).all();
  return { patterns };
};
