// get by id
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

interface Params {
  params: {
    id: string 
  }
}

export async function GET({ params }: Params) {
  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, parseInt(params.id, 10)))
    .get();

  if (!pattern) {
    return json({ error: "Prompt pattern not found" }, { status: 404 });
  }

  return json(pattern);
}
