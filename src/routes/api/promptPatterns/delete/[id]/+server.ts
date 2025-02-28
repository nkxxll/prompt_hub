import { redirect, json, type RequestEvent } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(event: RequestEvent) {
  // auth
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }

  const params = event.params;
  if (!params.id) {
    return json({ error: "Missing ID" }, { status: 400 });
  }

  await db.delete(promptPatterns).where(eq(promptPatterns.id, parseInt(params.id, 10))).run();
  return json({ message: "Deleted successfully" });
}
