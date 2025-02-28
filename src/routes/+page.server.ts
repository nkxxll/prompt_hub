import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const patterns = await db.select().from(promptPatterns).all();
  return { patterns };
};
