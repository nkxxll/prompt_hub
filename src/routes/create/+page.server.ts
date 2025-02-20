import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }: { request: Request }) => {
    console.log(request);
    const formData = await request.formData();
    // TODO save the data in the database
    console.log(formData);
    return { success: true };
  },
} satisfies Actions;
