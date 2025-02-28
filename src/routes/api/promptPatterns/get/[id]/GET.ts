import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { Params } from "./+server";


export async function GET({ params }: Params) {
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

