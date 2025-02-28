import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }
  const params = event.params;

  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, parseInt(params.slug!, 10)))
    .get();
  return { pattern };
};
