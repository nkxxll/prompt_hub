import { db } from "$lib/server/db";
import { promptPatterns } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }
  return { user: event.locals.user };
};

export const actions = {
  default: async ({ request }: { request: Request }) => {
    console.log(request);
    const formData = await request.formData();

    const pattern = {
      formatString: String(formData.get("formatString")), // Default to empty string if missing
      name: String(formData.get("name")),
      llmWebsite: String(formData.get("llmWebsite")),
      notes: String(formData.get("notes")),
      category: String(formData.get("category")),
      public: String(formData.get("public")) === "on", // Convert "on" from checkbox to boolean
      userId: String(formData.get("userId")),
      createdAt: new Date().toISOString(), // Set creation timestamp
      updatedAt: new Date().toISOString(), // Set initial updated timestamp
    };

    console.log(pattern);

    const [createdPattern] = await db.insert(promptPatterns).values(pattern).returning();
    console.log(createdPattern);

    return redirect(301, "/");
  },
} satisfies Actions;
