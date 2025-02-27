import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { fail, json, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ params }: { params: any }) => {
  const pattern = await db
    .select()
    .from(promptPatterns)
    .where(eq(promptPatterns.id, params.slug))
    .get();
  return { pattern };
};

export const actions = {
  default: async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    console.log(...formData);

    const pattern = {
      id: Number(formData.get("id")!), // Convert ID to number
      formatString: String(formData.get("formatString")) || "", // Default to empty string if missing
      name: String(formData.get("name")) || "",
      llmWebsite: String(formData.get("llmWebsite")) || "",
      notes: String(formData.get("notes")) || "",
      category: String(formData.get("category")) || "",
      public: String(formData.get("public")) === "on", // Convert "on" from checkbox to boolean
      userId: Number(formData.get("userId")) || 0,
      updatedAt: new Date().toISOString(), // Add a timestamp for database updates
    };

    console.log(pattern);

    const [updatedPattern] = await db
      .update(promptPatterns)
      .set(pattern)
      .where(eq(promptPatterns.id, pattern.id))
      .returning();

    if (!updatedPattern) {
      return fail(500, { message: "Pattern not found" });
    }

    return { success: true };
  },
} satisfies Actions;
